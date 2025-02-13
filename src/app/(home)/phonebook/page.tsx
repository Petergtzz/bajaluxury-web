"use client";

import React from "react";
import { TableComponent } from "@/components/data-table/data-table";
import { SidebarInset } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  localLineNumbers,
  highendRestaurants,
  localRestaurants,
  generalNumbers,
  generalColumns,
  localLineColumns,
  restaurantColumns,
} from "@/lib/data";

export default function PhoneBookPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-6 px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-x-6">
            <h2 className="text-3xl font-bold tracking-tight p2-1 px-0">
              PhoneBook
            </h2>
          </div>
        </div>
      </header>
      <Tabs defaultValue="fine dinning" className="space-y-1 p-5 px-8">
        <TabsList>
          <TabsTrigger value="fine dinning">Fine Dinning</TabsTrigger>
          <TabsTrigger value="eateries">Eateries</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        <TabsContent value="fine dinning">
          <TableComponent
            data={highendRestaurants}
            columns={restaurantColumns}
          />
        </TabsContent>
        <TabsContent value="eateries">
          <TableComponent data={localRestaurants} columns={restaurantColumns} />
        </TabsContent>
        <TabsContent value="contacts">
          <TableComponent data={localLineNumbers} columns={localLineColumns} />
        </TabsContent>
        <TabsContent value="general">
          <TableComponent data={generalNumbers} columns={generalColumns} />
        </TabsContent>
      </Tabs>
    </SidebarInset>
  );
}
