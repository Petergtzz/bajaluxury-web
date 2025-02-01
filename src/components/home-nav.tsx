"use client";

import { Home, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/app/login/actions";

export function HomeNav() {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Home className="size-4" size={16} strokeWidth={1.0} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-48 rounded-lg p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <div className="space-y-2">
              <DropdownMenuItem className="p-1">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2"
                >
                  {theme === "dark" ? (
                    <Sun className="size-4" size={16} strokeWidth={1.0} />
                  ) : (
                    <Moon className="size-4" size={16} strokeWidth={1.0} />
                  )}
                  <span>
                    {theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"}{" "}
                  </span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-1">
                <div className="flex items-center gap-2">
                  <LogOut className="size-4" size={16} strokeWidth={1.0} />
                  <button onClick={() => logout()}>Log out</button>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
