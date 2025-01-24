"use client";

import * as React from "react";
import { Home, Settings, Camera, Database } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Data",
    url: "#",
    icon: Database,
  },
  {
    title: "Photos",
    url: "#",
    icon: Camera,
  },
  {
    title: "Phone",
    url: "#",
    icon: Settings,
  },
];

// Only keep icons in the sidebar.
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon size={16} strokeWidth={1.25} />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarHeader>
    </Sidebar>
  );
}
