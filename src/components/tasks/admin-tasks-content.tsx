import React from "react";
import { Tasks } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchAdminTasks } from "@/actions/fetch-turso-data";
import { useQuery } from "@tanstack/react-query";
import { AlertDestructive } from "../error-message";
import Loading from "../loading-component";

export default function AdminTasksContent() {
  const {
    data: adminTasks,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["adminTasks"],
    queryFn: fetchAdminTasks,
  });

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "concept", header: "Concept" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "date", header: "Date" },
  ];

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <div>
      <TableComponent<Tasks> data={adminTasks} columns={columns} />
    </div>
  );
}
