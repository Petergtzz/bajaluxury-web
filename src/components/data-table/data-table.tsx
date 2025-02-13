"use client";

import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataPagination } from "./data-table-pagination";
import { DataTableColumnHeader } from "./data-table-header";
import { useTableConfig } from "@/hooks/use-table-config";
import { ActionButtons } from "./data-table-action-buttons";

type TableColumn = {
  accessorKey: string;
  header: string;
  isNumeric?: boolean;
  cell?: (row: any) => React.ReactNode;
};

type TableComponentProps<T> = {
  data: T[];
  columns: TableColumn[];
  isAdmin?: boolean;
};

export function TableComponent<T>({
  data,
  columns,
  isAdmin = false,
}: TableComponentProps<T>) {
  const { table, globalFilter, setGlobalFilter } = useTableConfig(
    data,
    columns,
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3">
        <Input
          placeholder="Search"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <ActionButtons table={table} isAdmin={isAdmin} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4">
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
                    <TableCell
                      key={cell.id}
                      style={{
                        width: "140px",
                      }}
                      className="px-4"
                    >
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
