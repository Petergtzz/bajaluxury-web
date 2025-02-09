import React from "react";
import { Tasks } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchUserTasks } from "@/actions/fetch-tasks";

type UserTasksContentProps = {
  houseId: number;
};

export async function UserTasksContent({ houseId }: UserTasksContentProps) {
  const tasks = await fetchUserTasks(houseId);

  const columns = [
    { accessorKey: "concept", header: "Concept" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "date", header: "Date" },
  ];

  return (
    <div>
      <TableComponent<Tasks> data={tasks} columns={columns} />
    </div>
  );
}
