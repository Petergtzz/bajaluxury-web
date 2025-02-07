import React from "react";
import { fetchAllBalances } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";

export async function AdminBalances() {
  const expenses = await fetchAllBalances();
  const plainBalances = JSON.parse(JSON.stringify(expenses));

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "balance", header: "Balance" },
  ];

  return (
    <div>
      <TableComponent data={plainBalances} columns={columns} />
    </div>
  );
}
