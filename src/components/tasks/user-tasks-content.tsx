import React from "react";
import { Tasks } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserTasks } from "@/actions/fetch-tasks";
import { useQuery } from "@tanstack/react-query";
import { useClientSession } from "../session-client-provider";
import { AlertDestructive } from "../error-message";
import Loading from "../loading-component";

export default function UserTasksContent() {
  const session = useClientSession();
  const houseId = session?.houseId;

  const {
    data: userTasks,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["userTasks", houseId],
    queryFn: () => fetchUserTasks(houseId ?? -1),
  });

  const columns = [
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
      <TableComponent<Tasks> data={userTasks} columns={columns} />
    </div>
  );
}
