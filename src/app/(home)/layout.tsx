import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NavWrapper } from "@/components/nav-wrapper";
import { DriverInitializer } from "@/components/driver-initializer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <DriverInitializer>
              <div className="layout-container">
                <NavWrapper />
                <div className="main-content">{children}</div>
              </div>
            </DriverInitializer>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
