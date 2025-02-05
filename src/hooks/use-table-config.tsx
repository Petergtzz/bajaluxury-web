import { useMemo, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableColumn = {
  accessorKey: string;
  header: string;
  isNumeric?: boolean;
  cell?: (row: any) => React.ReactNode;
};

export function useTableConfig<T>(data: T[], columns: TableColumn[]) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const tableColumns = useMemo(
    () =>
      columns.map((column) => ({
        accessorKey: column.accessorKey,
        header: column.header,
        cell:
          column.accessorKey === "amount" || column.accessorKey === "balance"
            ? ({ row }: any) => {
                const value = row.getValue(column.accessorKey);
                return typeof value === "number"
                  ? `$ ${value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : `$0.00`;
              }
            : column.accessorKey === "date"
              ? ({ row }: any) => {
                  const value = row.getValue(column.accessorKey);
                  if (!value) return "N/A";

                  const date = new Date(value);
                  return isNaN(date.getTime())
                    ? "Invalid Date"
                    : date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                }
              : (column.cell ??
                (({ row }: any) => row.getValue(column.accessorKey))),
        enableSorting: true,
        enableHiding: true,
      })),
    [columns],
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const rawValue = row.getValue(columnId);
      if (!rawValue) return false;

      // Convert rawValue to a string for comparison
      const stringValue =
        typeof rawValue === "number"
          ? rawValue.toString()
          : typeof rawValue === "string"
            ? rawValue.toLowerCase()
            : rawValue instanceof Date
              ? rawValue
                  .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .toLowerCase()
              : "";

      // Normalize the filter value
      const normalizedFilter = filterValue.toLowerCase();

      // Check if the normalized filter matches the stringValue
      return stringValue.includes(normalizedFilter);
    },
  });

  return { table, globalFilter, setGlobalFilter };
}
