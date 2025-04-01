import { formatPrettyDate, formatAmount } from "@/lib/formatter";

export const getMergedColumns = (showHouseColumn: boolean) => [
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
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }: { row: any }) => {
      const balance = row.getValue("balance");
      const formattedBalance = formatAmount(balance);
      const textColor = balance >= 0 ? "text-green-600" : "text-red-700";

      return <span className={`number ${textColor}`}>{formattedBalance}</span>;
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
