"use client";
import Overview from "@/components/overview/overview";
import { Header } from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function OverviewPage() {
  return (
    <div className="w-full">
      <Header title="Insights" />
      <div className="px-8">
        <QueryClientProvider client={queryClient}>
          <Overview />
        </QueryClientProvider>
      </div>
    </div>
  );
}
