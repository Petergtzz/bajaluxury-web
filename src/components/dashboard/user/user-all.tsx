import React from "react";
import { TableComponent } from "@/components/data-table/data-table";
import { fetchMergedData } from "@/actions/fetch-turso-data";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading-component";
import { useClientSession } from "@/components/session-client-provider";
import { AlertDestructive } from "@/components/error-message";
import { getMergedColumns } from "@/components/data-table/columns/all-columns";

export default function UserAllContent() {
  const session = useClientSession();
  const houseId = session?.houseId ?? 0;

  const {
    data: merged,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["merged", houseId],
    queryFn: () => fetchMergedData(houseId),
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

  const columns = getMergedColumns(false);

  return (
    <div>
      <TableComponent data={merged} columns={columns} />
    </div>
  );
}
