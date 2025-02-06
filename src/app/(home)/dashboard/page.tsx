import React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TABS_CONFIG } from "@/components/dashboard/tabs-config";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();

  // check if session is valid
  if (!session) {
    return <div>Error: Invalid session. Please refresh the page.</div>;
  }

  const role = session?.role ?? "user";
  const tabs = TABS_CONFIG[role] || [];

  // Hanlde houseId only for user role
  const houseId = role === "user" ? session.houseId : undefined;

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
            {tab.content(role === "user" ? houseId! : 0)}
          </TabsContent>
        ))}
      </Tabs>
    </SidebarInset>
  );
}
