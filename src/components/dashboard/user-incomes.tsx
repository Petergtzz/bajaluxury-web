import React from "react";
import { fetchUserIncomes } from "@/lib/fetchuser";
import { TableComponent } from "@/components/data-table";
import { getSession } from "@/lib/session";

export async function UserIncomesContent() {
  const session = await getSession();
  if (
    !session ||
    session.role !== "user" ||
    typeof session.houseId !== "number"
  ) {
    throw new Error("User session or houseId is missing.");
  }

  const expenses = await fetchUserIncomes(session.houseId);
  const plainExpense = JSON.parse(JSON.stringify(expenses));

  const columns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "payment_method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent data={plainExpense} columns={columns} />
    </div>
  );
}
