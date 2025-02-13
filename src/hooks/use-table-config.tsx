import { DateTime } from "luxon";
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
  cell?: ({ row }: { row: any }) => React.ReactNode;
};

const formatAmount = (value: any) =>
  typeof value === "number"
    ? `$ ${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : `$0.00`;

const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = DateTime.fromISO(value);
  if (!date.isValid) return "Invalid Date";
  return date.toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function useTableConfig<T>(data: T[], columns: TableColumn[]) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const tableColumns = useMemo(() => {
    return columns.map((col) => {
      // Determine the cell formatter based on the accessorKey.
      let cellFormatter =
        col.cell ?? (({ row }: { row: any }) => row.getValue(col.accessorKey));
      if (["amount", "balance"].includes(col.accessorKey)) {
        cellFormatter = ({ row }: { row: any }) =>
          formatAmount(row.getValue(col.accessorKey));
      } else if (col.accessorKey === "date") {
        cellFormatter = ({ row }: { row: any }) =>
          formatDate(row.getValue(col.accessorKey));
      }

      return {
        accessorKey: col.accessorKey,
        header: col.header,
        cell: cellFormatter,
        enableSorting: true,
        enableHiding: true,
      };
    });
  }, [columns]);

  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    const rawValue = row.getValue(columnId);
    if (!rawValue) return false;
    const normalizedFilter = filterValue.toLowerCase();

    if (columnId === "date") {
      // Handle date column separately.
      const date = new Date(rawValue);
      if (isNaN(date.getTime())) return false;
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
      return (
        monthName.includes(normalizedFilter) ||
        fullDateString.includes(normalizedFilter)
      );
    }

    // Fallback for other columns.
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
  };

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
    globalFilterFn,
  });

  return { table, globalFilter, setGlobalFilter };
}
