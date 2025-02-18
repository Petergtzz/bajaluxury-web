export type DatabaseRow = Record<string, unknown>;
export type DatabaseHeader = Record<string, unknown>;

export interface DatabaseResultSet {
  rows: DatabaseRow[];
  headers: DatabaseHeader[];
  lastInsertRowid?: number;
}
