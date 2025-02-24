import {
  BaseDriver,
  ColumnTypeSelector,
  DatabaseHeader,
  DatabaseResultSet,
  DatabaseRow,
  DatabaseTableColumn,
  DatabaseTableSchema,
  DatabaseValue,
  DatabaseTableOperationReslt,
  DatabaseTableOperation,
  DriverFlags,
  SelectFromTableOptions,
} from "@/drivers/base-driver";
import { convertSQLiteType, escapeSqlValue } from "@/drivers/sqlite/sql-helper";
import { ColumnType } from "@/types/db-types";
import { createClient, ResultSet } from "@libsql/client/web";
import { deleteFrom, insertInto, updateTable } from "./query-builder";
import { parseCreateTableScript } from "./sqlite/sql-parse-table";
import { validateOperation } from "@/lib/validation";

export function transformRawResult(raw: ResultSet): DatabaseResultSet {
  const headerSet = new Set();

  const headers: DatabaseHeader[] = raw.columns.map((headerName, headerIdx) => {
    const headerType = raw.columnTypes[headerIdx];
    let renamedHeaderName = headerName;

    for (let i = 0; i < 20; i++) {
      if (!headerSet.has(renamedHeaderName)) break;
      renamedHeaderName = `__${headerName}_${i}`;
    }

    headerSet.add(renamedHeaderName);

    return {
      name: renamedHeaderName,
      displayName: headerName,
      originalType: headerType,
      type: convertSQLiteType(headerType),
    };
  });

  const rows = raw.rows.map((row) =>
    headers.reduce((a, b, idx) => {
      const cellValue = row[idx];
      if (cellValue instanceof Uint8Array) {
        a[b.name] = Array.from(cellValue);
      } else {
        a[b.name] = row[idx];
      }
      return a;
    }, {} as DatabaseRow),
  );

  return {
    rows,
    headers,
    lastInsertRowid:
      raw.lastInsertRowid !== undefined
        ? undefined
        : Number(raw.lastInsertRowid),
  };
}

export default class TursoDriver extends BaseDriver {
  private client;

  constructor(url?: string, authToken?: string) {
    super();
    this.client = createClient({
      url: url || process.env.TURSO_DATABASE_URL!,
      authToken: authToken || process.env.TURSO_AUTH_TOKEN!,
    });
  }

  // Flags
  // Returns an object containing various capabilities for the driver
  getFlags(): DriverFlags {
    // Turso-specific
    return {
      defaultSchema: "main",
      optionalSchema: true,
      supportBigInt: false,
      supportCreateUpdateTable: true,
      supportModifyColumn: false,
      supportInsertReturning: true,
      supportUpdateReturning: true,
      supportRowId: true,
      supportCreateUpdateDatabase: false,
      supportCreateUpdateTrigger: false,
    };
  }

  columnTypeSelector: ColumnTypeSelector = {
    type: "dropdown",
    dropdownNormalized: (typeName: string): string => {
      const type = convertSQLiteType(typeName);
      if (type === undefined) return "TEXT";
      if (type === ColumnType.INTEGER) return "INTEGER";
      if (type === ColumnType.REAL) return "REAL";
      if (type === ColumnType.BLOB) return "BLOB";
      return "TEXT";
    },
    dropdownOptions: [
      { text: "Integer", value: "INTEGER" },
      { text: "Real", value: "REAL" },
      { text: "Text", value: "TEXT" },
      { text: "Blob", value: "BLOB" },
    ],
  };

  // Helper class methods
  escapeId(id: string) {
    return `"${id.replace(/"/g, '""')}"`;
  }

  escapeValue(value: unknown): string {
    return escapeSqlValue(value);
  }

  // Methods
  close(): void {
    // do nothing
  }

  async query(query: string) {
    const result = await this.client.execute(query);
    return transformRawResult(result);
  }

  async transaction(queries: string[]) {
    return (await this.client.batch(queries, "write")).map(transformRawResult);
  }

  protected async legacyTableSchema(
    schemaName: string,
    tableName: string,
  ): Promise<DatabaseTableSchema> {
    const sql = `SELECT * FROM ${this.escapeId(schemaName)}.pragma_table_info(${this.escapeValue(tableName)});`;
    const result = await this.query(sql);

    const rows = result.rows as Array<{
      name: string;
      type: string;
      pk: number;
    }>;

    const columns: DatabaseTableColumn[] = rows.map((row) => ({
      name: row.name,
      type: row.type,
      pk: !!row.pk,
    }));

    // Check auto increment
    let hasAutoIncrement = false;

    try {
      const seqCount = await this.query(
        `SELECT COUNT(*) AS total FROM ${this.escapeId(schemaName)}.sqlite_sequence WHERE name=${escapeSqlValue(
          tableName,
        )};`,
      );

      const seqRow = seqCount.rows[0];
      if (seqRow && Number(seqRow[0] ?? 0) > 0) {
        hasAutoIncrement = true;
      }
    } catch (e) {
      console.error(e);
    }

    return {
      columns,
      schemaName,
      pk: columns.filter((col) => col.pk).map((col) => col.name),
      autoIncrement: hasAutoIncrement,
    };
  }

  async tableSchema(
    schemaName: string,
    tableName: string,
  ): Promise<DatabaseTableSchema> {
    const sql = `SELECT * FROM ${this.escapeId(schemaName)}.sqlite_schema WHERE tbl_name = ${escapeSqlValue(
      tableName,
    )};`;
    const result = await this.query(sql);

    try {
      try {
        const rows = result.rows as Array<{ type: string; sql: string }>;
        const def = rows.find((row) => row.type === "table");

        if (def) {
          const createScript = def.sql;

          return {
            ...parseCreateTableScript(schemaName, createScript),
            createScript,
            schemaName,
            type: "table",
          };
        }

        throw new Error("Unexpected error finding table " + tableName);
      } catch (e) {
        throw new Error("Unexpected error while parsing");
      }
    } catch {
      return await this.legacyTableSchema(schemaName, tableName);
    }
  }

  async findFirst(
    schemaName: string,
    tableName: string,
    key: Record<string, DatabaseValue>,
  ): Promise<DatabaseResultSet> {
    const wherePart = Object.entries(key)
      .map(([colName, colValue]) => {
        return `${this.escapeId(colName)} = ${escapeSqlValue(colValue)}`;
      })
      .join(", ");

    // If there is rowid, it is likely, we need to query that row back
    const hasRowId = !!key["rowid"];

    const sql = `SELECT ${hasRowId ? "rowid, " : ""}* FROM ${this.escapeId(schemaName)}.${this.escapeId(tableName)} ${wherePart ? "WHERE " + wherePart : ""} LIMIT 1 OFFSET 0`;
    return this.query(sql);
  }

  async selectTable(
    schemaName: string,
    tableName: string,
    options: SelectFromTableOptions,
  ): Promise<{ data: DatabaseResultSet; schema: DatabaseTableSchema }> {
    const schema = await this.tableSchema(schemaName, tableName);
    let injectRowIdColumn = false;

    // If there is no primary key, we will fallback to rowid.
    // But we need to make sure there is no rowid column
    if (
      schema.pk.length === 0 &&
      !schema.withoutRowId &&
      !schema.columns.find((c) => c.name === "rowid") &&
      schema.type === "table"
    ) {
      // Inject the rowid column
      injectRowIdColumn = true;
      schema.columns = [
        {
          name: "rowid",
          type: "INTEGER",
          constraint: {
            primaryKey: true,
            autoIncrement: true,
          },
        },
        ...schema.columns,
      ];
      schema.pk = ["rowid"];
      schema.autoIncrement = true;
    }

    const whereRaw = options.whereRaw?.trim();

    const orderPart =
      options.orderBy && options.orderBy.length > 0
        ? options.orderBy
            .map((r) => `${this.escapeId(r.columnName)} ${r.by}`)
            .join(", ")
        : "";

    const sql = `SELECT ${injectRowIdColumn ? "rowid, " : ""}* FROM ${this.escapeId(schemaName)}.${this.escapeId(tableName)}${
      whereRaw ? ` WHERE ${whereRaw} ` : ""
    } ${orderPart ? ` ORDER BY ${orderPart}` : ""} LIMIT ${escapeSqlValue(options.limit)} OFFSET ${escapeSqlValue(options.offset)};`;

    let data = await this.query(sql);

    // If data does not have any header, we will inject the header from schema
    if (data.headers.length === 0 && data.rows.length === 0) {
      data = {
        ...data,
        headers: schema.columns.map((col) => {
          return {
            name: col.name,
            originalType: col.type,
            displayName: col.name,
          };
        }),
      };
    }

    return {
      data,
      schema,
    };
  }

  protected validateUpdateOperation(
    ops: DatabaseTableOperation[],
    validateSchema: DatabaseTableSchema,
  ) {
    for (const op of ops) {
      const { valid, reason } = validateOperation(op, validateSchema);
      if (!valid) {
        throw new Error(reason);
      }
    }
  }

  async updateTableData(
    schemaName: string,
    tableName: string,
    ops: DatabaseTableOperation[],
    validateSchema?: DatabaseTableSchema,
  ): Promise<DatabaseTableOperationReslt[]> {
    if (validateSchema) {
      this.validateUpdateOperation(ops, validateSchema);
    }

    const sqls = ops.map((op) => {
      if (op.operation === "INSERT")
        return insertInto(
          this,
          schemaName,
          tableName,
          op.values,
          this.getFlags().supportInsertReturning,
          this.getFlags().supportRowId,
        );

      if (op.operation === "DELETE")
        return deleteFrom(this, schemaName, tableName, op.where);

      return updateTable(
        this,
        schemaName,
        tableName,
        op.values,
        op.where,
        this.getFlags().supportInsertReturning,
        this.getFlags().supportRowId,
      );
    });

    const result = await this.transaction(sqls);

    const tmp: DatabaseTableOperationReslt[] = [];

    for (let i = 0; i < result.length; i++) {
      const r = result[i];
      const op = ops[i];

      if (!r || !op) {
        tmp.push({});
        continue;
      }

      if (op.operation === "UPDATE") {
        if (r.rows.length === 1)
          // This is when database support RETURNING
          tmp.push({
            record: r.rows[0],
          });
        else {
          const selectResult = await this.findFirst(
            schemaName,
            tableName,
            op.where,
          );

          tmp.push({
            lastId: r.lastInsertRowid,
            record: selectResult.rows[0],
          });
        }
      } else if (op.operation === "INSERT") {
        if (r.rows.length === 1) {
          tmp.push({
            record: r.rows[0],
          });
        } else if (op.autoIncrementPkColumn) {
          const selectResult = await this.findFirst(schemaName, tableName, {
            [op.autoIncrementPkColumn]: r.lastInsertRowid,
          });

          tmp.push({
            record: selectResult.rows[0],
            lastId: r.lastInsertRowid,
          });
        } else if (op.pk && op.pk.length > 0) {
          const selectResult = await this.findFirst(
            schemaName,
            tableName,
            op.pk.reduce<Record<string, unknown>>((a, b) => {
              a[b] = op.values[b];
              return a;
            }, {}),
          );

          tmp.push({
            record: selectResult.rows[0],
            lastId: r.lastInsertRowid,
          });
        } else {
          tmp.push({});
        }
      } else {
        tmp.push({});
      }
    }

    return tmp;
  }
}
