import { ColumnType } from "@/types/db-types";

export function convertSQLiteType(type: string): ColumnType | undefined {
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
  if (type.includes("DATEIME")) return ColumnType.NUMERIC;

  return ColumnType.TEXT;
}
