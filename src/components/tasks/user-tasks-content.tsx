import React from "react";
import { Tasks } from "@/types";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchTasks } from "@/lib/fetchtasks";
import { getSession } from "@/lib/session";

export async function UserTasksContent() {
  const session = await getSession();
  if (
    !session ||
    session.role !== "user" ||
    typeof session.houseId !== "number"
  ) {
    throw new Error("User session or houseId is missing.");
  }

  const tasks = await fetchTasks(session.houseId);

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
