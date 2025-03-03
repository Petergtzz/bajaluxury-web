import React from "react";
import { fetchAllExpenses, query } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import { Expense } from "@/types";
import HotTable from "@/components/hot-table/hot-table";

export async function AdminExpenses() {
  const expenses = await fetchAllExpenses();
  // console.log(expenses);

  const example = await query("expenses");
  console.log(example);

  const data = example.rows;

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
      {/*<TableComponent<Expense> data={expenses} columns={columns} />*/}
      <HotTable
        data={example}
        // readonly={true}
        // isAdmin={true}
      />
    </div>
  );
}
