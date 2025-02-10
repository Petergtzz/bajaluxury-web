"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarHeader,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { HomeNav } from "@/components/home-nav";
import { NavMain } from "./nav-main";
import { items } from "@/config/docs";

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
