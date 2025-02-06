import React from "react";
import { UserIncome } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserIncomes } from "@/lib/fetchuser";
import { getSession } from "@/lib/session";

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
      <TableComponent<UserIncome> data={expenses} columns={columns} />
    </div>
  );
}
