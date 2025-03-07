import { fetchAllIncomes } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import Loading from "@/components/loading-component";
import { Income } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function AdminIncomes() {
  const {
    data: allIncomes,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["allIncomes"],
    queryFn: fetchAllIncomes,
  });

  if (isError) {
    return <div>Error</div>;
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
