import { createClient, ResultSet } from "@libsql/client/web";
import {
  DatabaseHeader,
  DatabaseResultSet,
  DatabaseRow,
  BaseDriver,
} from "@/drivers/base-driver";
import { convertSQLiteType } from "@/sql/sql-helper";

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

export default class TursoDriver {
  private client;

  constructor(url?: string, authToken?: string) {
    this.client = createClient({
      url: url || process.env.TURSO_DATABASE_URL!,
      authToken: authToken || process.env.TURSO_AUTH_TOKEN!,
    });
  }

  async query(query: string) {
    const result = await this.client.execute(query);
    return transformRawResult(result);
  }

  async transaction(queries: string[]) {
    return await this.client.batch(queries);
  }
}
