import { ColumnType } from "@/types/query-types";
import { ResultSet } from "@libsql/client/web";
import {
  DatabaseHeader,
  DatabaseResultSet,
  DatabaseRow,
} from "@/types/query-types";

function convertSQLiteType(type: string): ColumnType | undefined {
  if (type === "") return undefined;
  if (type === undefined) return ColumnType.BLOB;

  type = type.toUpperCase();

  // https://www.sqlite.org/datatype3.html
  // Integer types
  if (type.includes("INT")) return ColumnType.INTEGER;
  if (type.includes("INTEGER")) return ColumnType.INTEGER;

  // Char types
  if (type.includes("CHAR")) return ColumnType.TEXT;
  if (type.includes("TEXT")) return ColumnType.TEXT;
  if (type.includes("CLOB")) return ColumnType.TEXT;
  if (type.includes("STRING")) return ColumnType.TEXT;
  if (type.includes("VARCHAR(255)")) return ColumnType.TEXT;
  if (type.includes("VARCHAR(100)")) return ColumnType.TEXT;

  // No datatype specified
  if (type.includes("BLOB")) return ColumnType.BLOB;

  // Real types
  if (type.includes("REAL")) return ColumnType.REAL;
  if (type.includes("DOUBLE")) return ColumnType.REAL;
  if (type.includes("FLOAT")) return ColumnType.REAL;

  // Numeric types
  if (type.includes("NUMERIC")) return ColumnType.NUMERIC;
  if (type.includes("DECIMAL(10,2)")) return ColumnType.NUMERIC;
  if (type.includes("BOOLEAN")) return ColumnType.NUMERIC;
  if (type.includes("DATE")) return ColumnType.NUMERIC;
  if (type.includes("DATETIME")) return ColumnType.NUMERIC;

  return ColumnType.TEXT;
}

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
