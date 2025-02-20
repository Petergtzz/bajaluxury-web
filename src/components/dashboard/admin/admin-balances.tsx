import React from "react";
import { fetchAllBalances } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import { Balance } from "@/types";
import TursoDriver from "@/drivers/turso-driver";

export async function AdminBalances() {
  const balances = await fetchAllBalances();
  const driver = new TursoDriver();
  const result = await driver.query("SELECT * FROM balances");
  console.log(result);

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
