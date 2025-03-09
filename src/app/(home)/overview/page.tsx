"use client";
import Dashboard from "@/components/dashboard/dashboard";
import { Header } from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";

const queryClient = new QueryClient();

export default function OverviewPage() {
  return (
    <div className="w-full">
      <Header title="Overview" exchangeRate={true} />
      <div className="px-8">
        <QueryClientProvider client={queryClient}>
          <Dashboard />
        </QueryClientProvider>
      </div>
    </div>
  );
}
