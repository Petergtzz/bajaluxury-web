import React from "react";
import { UserIncome } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserIncomes } from "@/lib/fetchuser";
import { getSession } from "@/lib/session";

export async function UserIncomesContent() {
  const session = await getSession();
  if (
    !session ||
    session.role !== "user" ||
    typeof session.houseId !== "number"
  ) {
    throw new Error("User session or houseId is missing.");
  }

  const expenses = await fetchUserIncomes(session.houseId);

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
