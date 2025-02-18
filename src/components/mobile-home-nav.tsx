"use client";

import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Home, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function MobileHomeNav() {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="focus:ring-0 hover:bg-transparent hover:text-[hsl(var(--primary-foreground))]"
        >
          <Home className="w-4 h-4 stroke-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-48 rounded-lg p-2 mt-1"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <div className="space-y-2">
          <DropdownMenuItem className="p-1">
            <Button variant="ghost" className="h-4 p-1" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="w-4 h-4 stroke-1" />
              ) : (
                <Moon className="w-4 h-4 stroke-1" />
              )}
              <span>
                {theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"}{" "}
              </span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-1">
            <Button variant="ghost" className="h-4 p-1" onClick={logout}>
              <LogOut className="w-4 h-4 stroke-1" />
              Log out
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
