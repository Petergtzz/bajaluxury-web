"use client";

import { Home, LogOut, Moon, Sun, Bug } from "lucide-react";
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
            <div
              className="w-full h-[120px] mb-2 overflow-hidden flex flex-col justify-end bg-white rounded-t-lg"
              style={{
                background:
                  "url('https://qvfyv6rrab.ufs.sh/f/iq2bdhwTfBnrHZNhvLqH09wfpsJyoMnWA1vRxrO7Q3GlhU8e') center center / cover",
              }}
            >
              <div className="bg-black bg-opacity-50 p-1 text-white text-center">
                <div className="font-bold text-sm">Baja Luxury Management</div>
              </div>
            </div>

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
              <hr className="border-t border-gray-200" />
              <DropdownMenuItem className="p-1">
                <div className="flex items-center gap-2">
                  <Bug className="size-4" size={16} strokeWidth={1.0} />
                  <button>Report Issues</button>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
