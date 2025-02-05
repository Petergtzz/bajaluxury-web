import { SidebarInset } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TABS_CONFIG } from "@/components/dashboard/tabs-config";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();

  const role = session?.role ?? "user";
  console.log(role);
  const tabs = TABS_CONFIG[role] || [];

  return (
    <SidebarInset>
      <DashboardHeader />
      <Tabs defaultValue={tabs[0]?.value} className="space-y-1 p-5 px-8">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-1">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </SidebarInset>
  );
}
