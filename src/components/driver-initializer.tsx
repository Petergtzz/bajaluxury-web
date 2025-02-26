import TursoDriver from "@/drivers/turso-driver";
import { DriverProvider } from "@/context/driver-provider";

export async function DriverInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const driver = new TursoDriver();

  return <DriverProvider driver={driver}>{children}</DriverProvider>;
}
