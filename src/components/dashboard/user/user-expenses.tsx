import React from "react";
import { Expense } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserExpenses } from "@/actions/fetch-turso-data";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading-component";
import { useClientSession } from "@/components/session-client-provider";
import { AlertDestructive } from "@/components/error-message";

export default function UserExpensesContent() {
  const session = useClientSession();
  const houseId = session?.houseId ?? 0;

  const {
    data: expenses,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["expenses", houseId],
    queryFn: () => fetchUserExpenses(houseId),
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

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
