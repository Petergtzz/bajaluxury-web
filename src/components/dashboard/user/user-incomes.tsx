import React from "react";
import { Income } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserIncomes } from "@/actions/fetch-user-data";

type UserIncomesContentProps = {
  houseId: number;
};

export async function UserIncomesContent({ houseId }: UserIncomesContentProps) {
  const expenses = await fetchUserIncomes(houseId);

  const columns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent<Income> data={expenses} columns={columns} />
    </div>
  );
}
