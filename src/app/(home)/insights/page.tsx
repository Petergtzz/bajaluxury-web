"use client";
import Insights from "@/components/insights/insights";
import { Header } from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function InsightsPage() {
  return (
    <div className="w-full">
      <Header title="Insights" exchangeRate={true} />
      <div className="px-8">
        <QueryClientProvider client={queryClient}>
          <Insights />
        </QueryClientProvider>
      </div>
    </div>
  );
}
