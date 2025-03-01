"use client";

import { DatabaseResultSet } from "@/types/query-types";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { HotTablePagination } from "./hot-table-pagination";

type TableColumn = {
  accessorKey: string;
  header: string;
  isNumeric?: boolean;
  cell?: ({ row }: { row: any }) => React.ReactNode;
};

interface HotTableProps {
  data: DatabaseResultSet;
  readonly?: boolean;
  isAdmin?: boolean;
}

export default function HotTable({ data, isAdmin }: HotTableProps) {
  const [tableData, setTableData] = useState(data);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{
    row: number | string;
    col: string;
  } | null>(null);

  const columns = useMemo(() => {
    return tableData.headers.map((column) => ({
      accessorKey: column.name,
      header: column.displayName,
    }));
  }, [tableData.headers]);

  const table = useReactTable({
    data: tableData.rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleRowSelection = (rowIndex: number) => {
    setSelectedRow(rowIndex);
    setSelectedCell(null);
  };

  const handleCellSelection = (rowIndex: number, col: string) => {
    setSelectedCell({ row: rowIndex, col });
  };

  const handleSave = () => {
    console.log("Saving changes to the database:", data);
  };

  return (
    <div className="w-full pt-5 ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border border-gray-300 bg-gray-100"
                >
                  {header.id}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                className={`cursor-pointer ${
                  selectedRow === rowIndex ? "bg-blue-100" : ""
                }`}
                onClick={() => handleRowSelection(rowIndex)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`border border-gray-300 cursor-pointer ${
                      selectedCell?.row === rowIndex &&
                      selectedCell?.col === cell.column.id
                        ? "bg-yellow-200"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row selection when clicking a cell
                      handleCellSelection(rowIndex, cell.column.id);
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center space-x-2 py-4">
        <HotTablePagination table={table} />
      </div>
    </div>
  );
}
