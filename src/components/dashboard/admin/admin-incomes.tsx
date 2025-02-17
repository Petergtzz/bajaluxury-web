import React from "react";
import { fetchAllIncomes } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import { Income } from "@/types";

export async function AdminIncomes() {
  const incomes = await fetchAllIncomes();
  const isAdmin = true;

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent<Income>
        data={incomes}
        columns={columns}
        isAdmin={isAdmin}
      />
    </div>
  );
}
