"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData, YourDataType } from "@/lib/data";

export function DataDisplay() {
  const { data, error, isLoading } = useQuery<YourDataType[]>({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data from Turso Database</h1>
      <ul>
        {data?.map((row) => (
          <li key={row.id}>
            {row.name} {/* Display specific fields */}
          </li>
        ))}
      </ul>
    </div>
  );
}
