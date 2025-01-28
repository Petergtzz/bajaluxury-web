import React from "react";
import { fetchAllExpenses } from "@/lib/fetchadmin";
import { TableComponent } from "@/components/data-table";

export async function ExpensesContent() {
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

//<div className="col-span-1 lg:col-span-2">
//  <AccountBalanceCard />
//   <ChartCard />
//</div>
