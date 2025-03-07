"use client";
import React from "react";
import { fetchAllBalances } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import { Balance } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading-component";

export default function AdminBalances() {
  const {
    data: allBalances,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["allBalances"],
    queryFn: fetchAllBalances,
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isPending) {
    return <Loading />;
  }

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "balance", header: "Balance" },
  ];

  return (
    <div>
      <TableComponent<Balance> data={allBalances} columns={columns} />
    </div>
  );
}
