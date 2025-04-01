import React from "react";
import { Income } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserIncomes } from "@/actions/fetch-turso-data";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading-component";
import { useClientSession } from "@/components/session-client-provider";
import { AlertDestructive } from "@/components/error-message";
import { getIncomeColumns } from "@/components/data-table/columns/income-columns";

export default function UserIncomesContent() {
  const session = useClientSession();
  const houseId = session?.houseId ?? 0;

  const {
    data: incomes,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["incomes", houseId],
    queryFn: () => fetchUserIncomes(houseId),
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

  const columns = getIncomeColumns(false);

  return (
    <div>
      <TableComponent<Income> data={incomes} columns={columns} />
    </div>
  );
}
