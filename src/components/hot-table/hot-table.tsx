"use client";

import { DatabaseResultSet } from "@/types/query-types";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  createRow,
} from "@tanstack/react-table";
import { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { HotTablePagination } from "./hot-table-pagination";
import { Input } from "@/components/ui/input";
import { HotTableColumnHeader } from "./hot-table-header";
import { useTableConfig } from "@/hooks/use-table-config-test";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { isNumber } from "node:util";
import { CANCELLED } from "node:dns";

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

  const [changeNumber, setChangeNumber] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newRowAdded, setNewRowAdded] = useState(false);

  const columns = useMemo(() => {
    return tableData.headers.map((column) => ({
      accessorKey: column.name,
      header: column.displayName,
    }));
  }, [tableData.headers]);

  const { table, globalFilter, setGlobalFilter } = useTableConfig(
    tableData.rows,
    columns,
  );

  const handleRowSelection = (rowIndex: number) => {
    setSelectedRow(rowIndex);
    setSelectedCell(null);
  };

  const handleCellSelection = (rowIndex: number, col: string) => {
    setSelectedCell({ row: rowIndex, col });
    setSelectedRow(null);
  };

  const createEmptyRow = useCallback(() => {
    const newRow: Record<string, any> = {};

    tableData.headers.forEach((header) => {
      newRow[header.name] = "Default";
    });

    return newRow;
  }, [tableData.headers]);

  const handleAddRow = useCallback(() => {
    const newRow = createEmptyRow();
    setTableData((prevData) => {
      const updatedRows = [newRow, ...prevData.rows];
      return {
        ...prevData,
        rows: updatedRows,
      };
    });
    // Clear any current selection (optional)
    setSelectedRow(null);
    setSelectedCell(null);
  }, [createEmptyRow]);

  const handleCellChange = (rowIndex: number, col: string, value: any) => {
    let errorMessage = "";
    if (col === "amount" && Number(value)) {
      errorMessage = "Amount must be a number";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${rowIndex}-${col}`]: errorMessage,
    }));

    setChangeNumber((prevNumber) => prevNumber + 1);
  };

  const handleDeleteRow = () => {
    const updatedRows = tableData.rows.filter(
      (row, index) => index !== selectedRow,
    );
    setTableData((prevData) => {
      return {
        ...prevData,
        rows: updatedRows,
      };
    });
    // Clear any current selection (optional)
    setSelectedRow(null);
    setSelectedCell(null);
  };

  const handleDiscardChanges = () => {
    console.log("Discarding changes");
  };

  const handleSave = () => {
    console.log("Saving changes to the database:");
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-5 gap-3">
        <Input
          placeholder="Search"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-full max-w-60"
        />
        <Button variant={"outline"}>
          <RefreshCcw className="h-4 w-4 stroke-1 text-green-600" />
        </Button>
        <Button variant="outline" onClick={handleAddRow}>
          <div className="text-sm">Add row</div>
        </Button>
        <Button variant="outline" onClick={handleDeleteRow}>
          <div className="text-sm">Delete row</div>
        </Button>
        {/* Track number of changes and display the number as a button */}
        {changeNumber ? (
          <>
            <Button disabled={!changeNumber}>
              <div>
                Save {changeNumber ? changeNumber.toString() : ""} changes
              </div>
            </Button>

            <Button variant={"destructive"}>
              <div className="text-sm">Discard</div>
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {/* Header Index */}
              <TableHead
                className="border border-gray-200 bg-gray-100"
                style={{ width: 40 }}
              ></TableHead>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border border-gray-200 bg-gray-100"
                >
                  <HotTableColumnHeader
                    column={header.column}
                    title={header.id}
                  />
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
                className={`cursor-pointer border ${
                  selectedRow === rowIndex
                    ? "border-2 border-blue-700 bg-blue-50"
                    : ""
                }`}
                onClick={() => handleRowSelection(rowIndex)}
              >
                {/* Row Index */}
                <TableCell className="border border-gray-200 bg-gray-100 text-right">
                  {rowIndex + 1}
                </TableCell>
                {/* Normal cell values */}
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ height: 50 }}
                    className={`border border-gray-100 cursor-pointer ${
                      selectedCell?.row === rowIndex &&
                      selectedCell?.col === cell.column.id
                        ? "border-2 border-blue-700"
                        : ""
                    } `}
                    onClick={(e) => {
                      e.stopPropagation();
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
