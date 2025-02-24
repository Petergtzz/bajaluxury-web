import { ColumnType } from "@/types/db-types";

// https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
const byteToHex: string[] = [];

export function hex(arrayBuffer: ArrayBuffer) {
  const buff = new Uint8Array(arrayBuffer);
  let hexOctets = "";

  for (let i = 0; i < buff.length; ++i) hexOctets += byteToHex[buff[i]];
  return hexOctets;
}

export function unescapeIdentity(str: string) {
  let r = str.replace(/^["`[]/g, "");
  r = r.replace(/["`\]]$/g, "");
  r = r.replace(/""/g, `"`);
  return r;
}

export function escapeSqlString(str: string) {
  return `'${str.replace(/'/g, `''`)}'`;
}

export function escapeSqlBinary(value: ArrayBuffer) {
  return `x'${hex(value)}'`;
}

export function escapeSqlValue(value: unknown) {
  if (value === undefined) return "DEFAULT";
  if (value === null) return "NULL";
  if (typeof value === "string") return escapeSqlString(value);
  if (typeof value === "number") return value.toString();
  if (typeof value === "bigint") return value.toString();
  if (value instanceof ArrayBuffer) return escapeSqlBinary(value);
  if (Array.isArray(value))
    return escapeSqlBinary(Uint8Array.from(value).buffer);
  throw new Error(value.toString() + " is unrecongize type of value");
}

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
