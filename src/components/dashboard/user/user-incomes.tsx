import React from "react";
import { Income } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserIncomes } from "@/actions/fetch-user-data";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading-component";
import { useClientSession } from "@/components/session-client-provider";

export default function UserIncomesContent() {
  const session = useClientSession();
  const houseId = session?.houseId ?? 0;

  const {
    data: incomes,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["incomes", houseId],
    queryFn: () => fetchUserIncomes(houseId),
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isPending) {
    return <Loading />;
  }

  const columns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent<Income> data={incomes} columns={columns} />
    </div>
  );
}
