import React from "react";
import { UserExpense } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserExpenses } from "@/lib/fetchuser";
import { getSession } from "@/lib/session";

export async function UserExpensesContent() {
  const session = await getSession();
  if (
    !session ||
    session.role !== "user" ||
    typeof session.houseId !== "number"
  ) {
    throw new Error("User session or houseId is missing.");
  }

  const expenses = await fetchUserExpenses(session.houseId);
  // const plainExpense = JSON.parse(JSON.stringify(expenses));

  const columns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "concept", header: "Concept" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent<UserExpense> data={expenses} columns={columns} />
    </div>
  );
}
