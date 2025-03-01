export enum ColumnType {
  TEXT = 1,
  INTEGER = 2,
  REAL = 3,
  BLOB = 4,
  NUMERIC = 5,
}

export interface ColumnHeader {
  name: string;
  displayName: string;
  originalType: string;
  type?: ColumnType;
}

export type DatabaseHeader = ColumnHeader;
export type DatabaseRow = Record<string, unknown>;

// This will be used to represent the result of a query execution.
export interface DatabaseResultSet {
  rows: DatabaseRow[];
  headers: DatabaseHeader[];
  lastInsertRowid?: number;
}
