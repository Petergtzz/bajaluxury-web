import type { BaseDriver } from "@/drivers/base-driver";
import { type PropsWithChildren, createContext, useContext } from "react";

const DriverContext = createContext<{
  databaseDriver: BaseDriver;
}>({
  databaseDriver: {} as unknown as BaseDriver,
});

export function useDatabaseDriver() {
  return useContext(DriverContext);
}

export function DriverProvider({
  children,
  driver,
}: PropsWithChildren<{
  driver: BaseDriver;
}>) {
  return (
    <DriverContext.Provider value={{ databaseDriver: driver }}>
      {children}
    </DriverContext.Provider>
  );
}
