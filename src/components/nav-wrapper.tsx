"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "@/components/mobile-main-nav";
import { AppSidebar } from "@/components/app-sidebar";

export function NavWrapper() {
  const isMobile = useIsMobile();

  if (typeof isMobile === "undefined") {
    return null;
  }

  return isMobile ? <MobileNav /> : <AppSidebar />;
}
