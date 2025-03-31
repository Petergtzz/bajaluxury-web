import { formatPrettyDate } from "@/lib/formatter";

export type TableColumn = {
  accessorKey: string;
  header: string;
  isNumeric?: boolean;
  cell?: (row: any) => React.ReactNode;
};

export const expenseColumns = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: { row: any }) => {
      return formatPrettyDate(row.getValue("date"));
    },
  },
  {
    accessoryKey: "category",
    header: "Category",
    cell: ({ row }: { row: any }) => {
      return row.getValue("category");
    },
  },
];
