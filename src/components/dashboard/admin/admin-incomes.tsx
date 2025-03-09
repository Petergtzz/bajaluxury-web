import { fetchAllIncomes } from "@/actions/fetch-turso-data";
import { TableComponent } from "@/components/data-table/data-table";
import Loading from "@/components/loading-component";
import { Income } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertDestructive } from "@/components/error-message";

export default function AdminIncomes() {
  const {
    data: allIncomes,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["allIncomes"],
    queryFn: fetchAllIncomes,
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

  const columns = [
    { accessorKey: "house", header: "House" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent<Income> data={allIncomes} columns={columns} />
    </div>
  );
}
