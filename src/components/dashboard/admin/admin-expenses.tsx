import React from "react";
import { fetchAllExpenses } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import { Expense } from "@/types";

export async function AdminExpenses() {
  const expenses = await fetchAllExpenses();

  const columns = [
    { accessorKey: "house", header: "House" },
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
