import React from "react";
import { Expense } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserExpenses } from "@/actions/fetch-user-data";

type UserExpensesContentProps = {
  houseId: number;
};

export async function UserExpensesContent({
  houseId,
}: UserExpensesContentProps) {
  const expenses = await fetchUserExpenses(houseId);

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
      <TableComponent<Expense> data={expenses} columns={columns} />
    </div>
  );
}
