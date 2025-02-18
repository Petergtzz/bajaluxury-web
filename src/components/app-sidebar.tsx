"use client";

import * as React from "react";
import { HomeNav } from "@/components/home-nav";
import {
  Sidebar,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { items } from "@/config/docs";
import { NavMain } from "./nav-main";

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
