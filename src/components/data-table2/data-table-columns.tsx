import * as React from "react";
import { DataTableRowAction, Expense } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { DataTableColumnHeader } from "../data-table2/data-table-column-header";
import { formatAmount, formatDate } from "@/lib/formatter";

interface GetColumnsProps {
  headers: string[];
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<any> | null>
  >;
}

export function getColumns({
  headers,
  setRowAction,
}: GetColumnsProps): ColumnDef<any>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...headers.map((header) => ({
      accessorKey: header,
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader
          column={column}
          title={header.charAt(0).toUpperCase() + header.slice(1)}
        />
      ),
      cell: ({ row }: { row: any }) => {
        const value = row.getValue(header);

        if (typeof value === "number") {
          return <span className="text-left">{formatAmount(value)}</span>; // Formats numbers with commas (e.g., 1,234)
        }

        if (typeof value === "boolean") {
          return <span>{value ? "✅ Yes" : "❌ No"}</span>; // Display boolean values as icons/text
        }

        if (value instanceof Date) {
          return <span>{formatDate(value)}</span>;
        }

        return <span>{value !== undefined ? String(value) : "-"}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    })),
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "delete" })}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
