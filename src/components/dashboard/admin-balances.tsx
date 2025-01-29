import React from "react";
import { fetchAllBalances } from "@/lib/fetchadmin";
import { TableComponent } from "@/components/data-table";

export async function BalancesContent() {
  const expenses = await fetchAllBalances();
  const plainBalances = JSON.parse(JSON.stringify(expenses));

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "balance", header: "Balance" },
  ];

  return (
    <div className="w-1/2">
      <TableComponent data={plainBalances} columns={columns} />
    </div>
  );
}
