import { fetchAllIncomes } from "@/actions/fetch-turso-data";
import { TableComponent } from "@/components/data-table/data-table";
import Loading from "@/components/loading-component";
import { Income } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertDestructive } from "@/components/error-message";
import { getIncomeColumns } from "@/components/data-table/columns/income-columns";

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

  const columns = getIncomeColumns(true);

  return (
    <div>
      <TableComponent<Income> data={allIncomes} columns={columns} />
    </div>
  );
}
