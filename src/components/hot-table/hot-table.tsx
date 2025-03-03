"use client";

import { DatabaseResultSet } from "@/types/query-types";
import { flexRender, ColumnDef } from "@tanstack/react-table";
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

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { DownloadIcon, ChevronDown } from "lucide-react";
import { exportTableToCSV } from "@/lib/export";

type TableColumn = {
  accessorKey: string;
  header: string;
  customCell?: ({ cell }: { cell: any }) => React.ReactNode;
};

interface HotTableProps {
  data: DatabaseResultSet;
  readonly?: boolean;
  isAdmin?: boolean;
}

export default function HotTable({ data, isAdmin = true }: HotTableProps) {
  const [tableData, setTableData] = useState(data);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{
    row: number | string;
    col: string;
  } | null>(null);

  const [changeNumber, setChangeNumber] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newRowAdded, setNewRowAdded] = useState(false);

  console.log(tableData);

  const columns: TableColumn[] = useMemo(() => {
    return [
      {
        accessorKey: "select",
        header: "",
        customCell: ({ cell }: { cell: any }) => (
          <Checkbox
            checked={cell.row.getIsSelected()}
            onCheckedChange={(value) => cell.row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
      },
      ...tableData.headers.map((column) => ({
        accessorKey: column.name,
        header: column.displayName,
      })),
    ];
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
      <div className="flex items-center py-4 gap-3">
        <Input
          placeholder="Search"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-full max-w-60"
        />
        <div className="flex felx-col sm:flex-row items-center gap-3 ml-auto">
          {isAdmin && (
            <>
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
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="w-4 h-4 stroke-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize tracking-tight text-sm font-medium"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
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
            Export
            <DownloadIcon className="w-4 h-4 stroke-1" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border border-gray-200 bg-gray-200"
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
        <HotTablePagination table={table} />
      </div>
    </div>
  );
}
