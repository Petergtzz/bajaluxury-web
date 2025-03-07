"use client";
import React from "react";
import { TableComponent } from "@/components/data-table/data-table";
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
import { Header } from "@/components/header";

export default function PhoneBookPage() {
  return (
    <div className="w-full">
      <Header title="PhoneBook" exchangeRate={false} />
      <div className="px-8">
        <Tabs defaultValue="fine dinning" className="space-y-1">
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
            <TableComponent
              data={localRestaurants}
              columns={restaurantColumns}
            />
          </TabsContent>
          <TabsContent value="contacts">
            <TableComponent
              data={localLineNumbers}
              columns={localLineColumns}
            />
          </TabsContent>
          <TabsContent value="general">
            <TableComponent data={generalNumbers} columns={generalColumns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
