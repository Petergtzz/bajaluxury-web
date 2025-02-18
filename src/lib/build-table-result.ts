import { DatabaseResultSet } from "@/drivers/base-driver";

// Header interface for the interactive table
export interface OptimizeTableHeaderProps {
  name: string;
  display: {
    text?: string;
    initialSize?: number;
  };
  metadata: {
    type?: string;
  };
}

// Row interface for the interactive table
export interface BuildTableResultProps {
  result: DatabaseResultSet;
}

export function calculateInitialSize(
  headers: OptimizeTableHeaderProps,
  result: DatabaseResultSet,
): number {
  let initialSize = 100;
  const dataType = (headers.metadata.type || "").toUpperCase();

  // For columns with INTEGER or REAL data type, set the initial size to 100
  if (dataType === "INTEGER" || dataType === "REAL") {
    initialSize = 100;
  } else if (dataType === "TEXT") {
    let maxLength = 0;
    // Use 25 first rows to determine the good initial size
    for (let i = 0; i < Math.min(result.rows.length, 25); i++) {
      const row = result.rows[i];
      const cellValue = row[headers.name];
      if (cellValue) {
        maxLength = Math.max(String(cellValue).length, maxLength);
      }
    }
    // Multiply the max length by 8 to get the initial size
    initialSize = Math.max(150, Math.min(500, maxLength * 8));
  }
  return initialSize;
}

export function buildTableResultHeader(
  props: BuildTableResultProps,
): OptimizeTableHeaderProps[] {
  const { result } = props;

  const headers = result.headers.map((column) => ({
    name: column.name,
    display: {
      text: column.displayName,
      initialSize: 100,
    },
    metadata: {
      type: column.type,
    },
  })) as OptimizeTableHeaderProps[];

  headers.forEach((header) => {
    header.display.initialSize = calculateInitialSize(header, result);
  });

  return headers;
}
