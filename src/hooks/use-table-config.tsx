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

      const normalizedFilter = filterValue.toLowerCase();

      // Special handling for "date" column.
      if (columnId === "date") {
        // Ensure rawValue is a valid type:
        if (
          typeof rawValue !== "string" &&
          typeof rawValue !== "number" &&
          !(rawValue instanceof Date)
        ) {
          return false;
        }
        const date = new Date(rawValue as string | number | Date);
        if (isNaN(date.getTime())) return false;

        // Create different string representations:
        const monthName = date
          .toLocaleString("en-US", { month: "long" })
          .toLowerCase();
        const fullDateString = date
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .toLowerCase();

        // Match if the filter text appears in either the month alone or the full date string.
        return (
          monthName.includes(normalizedFilter) ||
          fullDateString.includes(normalizedFilter)
        );
      }

      // Fallback for other columns:
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

      return stringValue.includes(normalizedFilter);
    },
  });

  return { table, globalFilter, setGlobalFilter };
}
