import { getSession } from "@/lib/session";
import SessionClientProvider from "./session-client-provider";
import { redirect } from "next/navigation";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <SessionClientProvider session={session}>{children}</SessionClientProvider>
  );
}
