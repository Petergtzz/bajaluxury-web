import { type ColumnHeader, ColumnType } from "@/types/db-types";

export type DatabaseRow = Record<string, unknown>;
export type DatabaseHeader = ColumnHeader;

// This will be used to represent the result of a query execution.
export interface DatabaseResultSet {
  rows: DatabaseRow[];
  headers: DatabaseHeader[];
  lastInsertRowid?: number;
}
