import { formatPrettyDate, formatAmount } from "@/lib/formatter";

export const getBalanceColumns = [
  {
    accessorKey: "house",
    header: "House",
    cell: ({ row }: { row: any }) => {
      return <span className="capitalize">{row.getValue("house")}</span>;
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
];
