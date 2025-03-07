import { fetchAllExpenses } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import Loading from "@/components/loading-component";
import { Expense } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function AdminExpenses() {
  const {
    data: allExpenses,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["allExpenses"],
    queryFn: fetchAllExpenses,
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
    { accessorKey: "category", header: "Category" },
    { accessorKey: "concept", header: "Concept" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <div>
      <TableComponent<Expense> data={allExpenses} columns={columns} />
    </div>
  );
}
