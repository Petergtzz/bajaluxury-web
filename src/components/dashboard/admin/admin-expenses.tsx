import { fetchAllExpenses } from "@/actions/fetch-turso-data";
import { TableComponent } from "@/components/data-table/data-table";
import Loading from "@/components/loading-component";
import { Expense } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertDestructive } from "@/components/error-message";

export default function AdminExpenses() {
  const {
    data: allExpenses,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["allExpenses"],
    queryFn: fetchAllExpenses,
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
