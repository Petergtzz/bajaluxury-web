"use client";

import * as React from "react";
import { Phone, PencilRuler, Database } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { HomeNav } from "@/components/home-nav";
import { NavMain } from "./nav-main";

const items = [
  {
    title: "Data",
    url: "/dashboard",
    icon: Database,
  },
  {
    title: "Punchlist",
    url: "/punchlist",
    icon: PencilRuler,
  },
  {
    title: "Phone",
    url: "/phonebook",
    icon: Phone,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HomeNav />
      </SidebarHeader>
      <SidebarGroupContent>
        <NavMain items={items} />
      </SidebarGroupContent>
    </Sidebar>
  );
}
