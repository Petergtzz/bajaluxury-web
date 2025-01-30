import React from "react";
import { fetchAllIncomes } from "@/lib/fetchadmin";
import { TableComponent } from "@/components/data-table/data-table";

export async function IncomesContent() {
  const expenses = await fetchAllIncomes();
  const plainIncome = JSON.parse(JSON.stringify(expenses));

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "payment_method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent data={plainIncome} columns={columns} />
    </div>
  );
}
