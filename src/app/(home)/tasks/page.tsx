import React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { UserTasksContent } from "@/components/tasks/user-tasks-content";
import { AdminTasksContent } from "@/components/tasks/admin-tasks-content";
import { getSession } from "@/lib/session";

export default async function TasksPage() {
  const session = await getSession();

  // check if session is valid
  if (!session) {
    return <div>Error: Invalid session. Please refresh the page.</div>;
  }

  const role = session?.role ?? "user";

  // Handle houseId only for user role
  const houseId = role === "user" ? session.houseId : undefined;

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-6 px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-x-5">
            <h2 className="text-3xl font-bold tracking-tight px-0">Tasks</h2>
          </div>
        </div>
      </header>
      <p className="px-8 my-2 text-muted-foreground">
        Here's a list of the tasks being performed at your residence
      </p>
      <div className="space-y-1 px-8">
        {role === "user" ? (
          <UserTasksContent houseId={houseId!} />
        ) : (
          <AdminTasksContent />
        )}
      </div>
    </SidebarInset>
  );
}
