"use client";
import { useClientSession } from "../session-client-provider";
import { TABS_CONFIG } from "./tabs-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const session = useClientSession();
  const role = session?.role ?? "user";
  const tabs = TABS_CONFIG[role] || [];

  return (
    <div>
      <Tabs defaultValue={tabs[0]?.value}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
