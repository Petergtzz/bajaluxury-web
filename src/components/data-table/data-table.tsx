"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { exportTableToCSV } from "@/lib/export";
import { DataPagination } from "./data-table-pagination";
import { DataTableColumnHeader } from "./data-table-header";

export type TableColumn = {
  accessorKey: string;
  header: string;
  isNumeric?: boolean;
  cell?: (row: any) => React.ReactNode;
};

export type TableComponentProps = {
  data: any[];
  columns: TableColumn[];
};

export function TableComponent({ data, columns }: TableComponentProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const tableColumns = React.useMemo(
    () =>
      columns.map((column) => ({
        accessorKey: column.accessorKey,
        header: column.header,
        cell:
          column.accessorKey === "amount" || column.accessorKey === "balance"
            ? ({ row }) => {
                const value = row.getValue(column.accessorKey);
                if (typeof value === "number" && !isNaN(value)) {
                  return `$ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }
                return `$0.00`;
              }
            : (column.cell ?? (({ row }) => row.getValue(column.accessorKey))),
        enableSorting: true,
        enableHiding: true,
        size: 150,
      })),
    [columns],
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const filterableColumn =
    table.getAllColumns().find((col) => col.getCanFilter()) ||
    table.getAllColumns()[0];

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3">
        <Input
          placeholder="Filter..."
          value={(filterableColumn.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            filterableColumn.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown size={16} strokeWidth={1.0} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize tracking-tight text-sm font-medium"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "data",
              excludeColumns: ["select", "actions"],
            })
          }
        >
          <DownloadIcon size={16} strokeWidth={1.0} />
          Export
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <DataTableColumnHeader
                      column={header.column}
                      title={String(header.column.columnDef.header)}
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} style={{ height: "55px" }}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: "150px" }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center space-x-2 py-4">
        <DataPagination table={table} />
      </div>
    </div>
  );
}
