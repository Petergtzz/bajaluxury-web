import { BaseDriver } from "@/drivers/base-driver";
import { createContext, useContext, type PropsWithChildren } from "react";

const DriverContext = createContext<{ databaseDriver: BaseDriver }>({
  databaseDriver: {} as unknown as BaseDriver,
});

export function useDatabaseDriver() {
  return useContext(DriverContext);
}

export function DriverProvider({
  children,
  driver,
}: PropsWithChildren<{ driver: BaseDriver }>) {
  return (
    <DriverContext.Provider value={{ databaseDriver: driver }}>
      {children}
    </DriverContext.Provider>
  );
}
