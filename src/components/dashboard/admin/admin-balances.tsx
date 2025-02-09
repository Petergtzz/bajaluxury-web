import React from "react";
import { fetchAllBalances } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import { Balance } from "@/types";

export async function AdminBalances() {
  const balances = await fetchAllBalances();

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "balance", header: "Balance" },
  ];

  return (
    <div>
      <TableComponent<Balance> data={balances} columns={columns} />
    </div>
  );
}
