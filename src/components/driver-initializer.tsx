import React, { useMemo } from "react";
import TursoDriver from "@/drivers/turso-driver";
import { DriverProvider } from "@/context/driver-provider";

export function DriverInitializer({ children }: { children: React.ReactNode }) {
  const driver = useMemo(() => new TursoDriver(), []);

  return <DriverProvider driver={driver}>{children}</DriverProvider>;
}
