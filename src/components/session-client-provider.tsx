"use client";
import { createContext, useContext, PropsWithChildren } from "react";
import { SessionPayload } from "@/lib/session";

const SessionContext = createContext<SessionPayload | undefined>(undefined);

export function useClientSession(): SessionPayload | undefined {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error(
      "useClientSession must be used within a SessionClientProvider",
    );
  }
  return context;
}

export default function SessionClientProvider({
  session,
  children,
}: PropsWithChildren<{ session: SessionPayload }>) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
