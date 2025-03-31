import React from "react";
import { fetchAllExpenses } from "@/actions/fetch-turso-data";
import { TableComponent } from "@/components/data-table/data-table";
import Loading from "@/components/loading-component";
import { Expense } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertDestructive } from "@/components/error-message";
import { DataTable } from "@/components/data-table2/data-table";

export default function AdminExpenses() {
  const {
    data: allExpenses,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["allExpenses"],
    queryFn: fetchAllExpenses,
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="mt-4">
      <DataTable data={allExpenses} />
    </div>
  );
}
