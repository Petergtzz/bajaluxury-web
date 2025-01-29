import React from "react";
import { fetchUserBalances } from "@/lib/fetchuser";
import { TableComponent } from "@/components/data-table";
import { getSession } from "@/lib/session";

export async function UserBalanceContent() {
  const session = await getSession();
  if (
    !session ||
    session.role !== "user" ||
    typeof session.houseId !== "number"
  ) {
    throw new Error("User session or houseId is missing.");
  }

  const expenses = await fetchUserBalances(session.houseId);
  const plainExpense = JSON.parse(JSON.stringify(expenses));

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "balance", header: "Balance" },
  ];

  return (
    <div>
      <TableComponent data={plainExpense} columns={columns} />
    </div>
  );
}
