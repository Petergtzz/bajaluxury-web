import { formatPrettyDate, formatAmount } from "@/lib/formatter";

export const getExpenseColumns = (showHouseColumn: boolean) => [
  ...(showHouseColumn
    ? [
        {
          accessorKey: "house",
          header: "House",
          cell: ({ row }: { row: any }) => (
            <span className="capitalize">{row.getValue("house")}</span>
          ),
          enableSorting: true,
          enableHiding: true,
        },
      ]
    : []),
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: { row: any }) => {
      return formatPrettyDate(row.getValue("date"));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }: { row: any }) => {
      return <span className="capitalize">{row.getValue("category")}</span>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "concept",
    header: "Concept",
    cell: ({ row }: { row: any }) => {
      return <span className="capitalize">{row.getValue("concept")}</span>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }: { row: any }) => {
      return <span className="capitalize">{row.getValue("method")}</span>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    center: true,
    cell: ({ row }: { row: any }) => {
      return <span className="">{formatAmount(row.getValue("amount"))}</span>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: { row: any }) => {
      return <span className="capitalize">{row.getValue("description")}</span>;
    },
    enableSorting: true,
    enableHiding: true,
  },
];
