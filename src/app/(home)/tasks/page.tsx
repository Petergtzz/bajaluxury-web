"use client";
import Tasks from "@/components/tasks/tasks";
import { Header } from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function TasksPage() {
  return (
    <div className="w-full">
      <Header title="Tasks" exchangeRate={false} />
      <div className="px-8">
        <QueryClientProvider client={queryClient}>
          <Tasks />
        </QueryClientProvider>
      </div>
    </div>
  );
}
