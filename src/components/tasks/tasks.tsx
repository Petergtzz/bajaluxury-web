"use client";
import React from "react";
import UserTasksContent from "@/components/tasks/user-tasks-content";
import AdminTasksContent from "@/components/tasks/admin-tasks-content";
import { useClientSession } from "@/components/session-client-provider";

export default function Tasks() {
  const session = useClientSession();
  const role = session?.role ?? "user";

  return (
    <div>
      <div className="space-y-1">
        {role === "user" ? <UserTasksContent /> : <AdminTasksContent />}
      </div>
    </div>
  );
}
