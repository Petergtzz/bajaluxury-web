import { fetchAllBalances } from "@/actions/fetch-turso-data";
import { TableComponent } from "@/components/data-table/data-table";
import { AlertDestructive } from "@/components/error-message";
import Loading from "@/components/loading-component";
import { Balance } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function AdminBalances() {
  const {
    data: allBalances,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["allBalances"],
    queryFn: fetchAllBalances,
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
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
