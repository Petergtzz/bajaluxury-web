import React from "react";
import { fetchAllExpenses } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";

export async function AdminExpenses() {
  const expenses = await fetchAllExpenses();
  const plainExpense = JSON.parse(JSON.stringify(expenses));

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "concept", header: "Concept" },
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
