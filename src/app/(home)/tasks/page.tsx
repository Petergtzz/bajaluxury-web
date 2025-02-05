import { SidebarInset } from "@/components/ui/sidebar";
import { UserTasksContent } from "@/components/tasks/user-tasks-content";

export default async function PunchListPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-6 px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-x-6">
            <h2 className="text-3xl font-bold tracking-tight px-0">Tasks</h2>
          </div>
        </div>
      </header>
      <div className="space-y-1 p-5 px-8">
        <UserTasksContent />
      </div>
    </SidebarInset>
  );
}
