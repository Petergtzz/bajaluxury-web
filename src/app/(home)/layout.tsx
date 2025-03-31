import { NavWrapper } from "@/components/nav-wrapper";
import SessionProvider from "@/components/session-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <SessionProvider>
              <NavWrapper />
              <NuqsAdapter>{children}</NuqsAdapter>
            </SessionProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
