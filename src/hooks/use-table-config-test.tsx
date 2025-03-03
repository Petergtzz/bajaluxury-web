import React from "react";
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
import getCellRenderer from "@/components/hot-table/hot-table-column-config";

type TableColumn = {
  accessorKey: string;
  header: string;
  customCell?: ({ cell }: { cell: any }) => React.ReactNode;
};

export function useTableConfig<T>(data: T[], columns: TableColumn[]) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const tableColumns = useMemo(() => {
    return columns.map((col) => {
      return {
        accessorKey: col.accessorKey,
        header: col.header,
        cell: getCellRenderer(col),
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
      const date = DateTime.fromISO(rawValue);
      if (!date.isValid) return false;
      const monthName = date.toLocaleString({ month: "long" }).toLowerCase();
      const fullDateString = date
        .toLocaleString({
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
  });

  return { table, globalFilter, setGlobalFilter };
}
