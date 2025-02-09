import React from "react";
import { Tasks } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchAdminTasks } from "@/actions/fetch-tasks";

export async function AdminTasksContent() {
  const tasks = await fetchAdminTasks();

  const columns = [
    { accessorKey: "house", header: "House" },
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
