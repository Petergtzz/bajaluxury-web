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
import { DataTableColumnHeader } from "@/components/data-table2/data-table-column-header";
import { formatAmount, formatPrettyDate } from "@/lib/formatter";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<any> | null>
  >;
}

export function getColumns({
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
      size: 40,
    },
    {
      id: "house",
      accessorKey: "house",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="House"
        ></DataTableColumnHeader>
      ),
      cell: ({ row }) => <span>{row.getValue("house")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Date"
        ></DataTableColumnHeader>
      ),
      cell: ({ row }) => <span>{formatPrettyDate(row.getValue("date"))}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "concept",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Concept"
        ></DataTableColumnHeader>
      ),
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue("concept")}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Category"
        ></DataTableColumnHeader>
      ),
      cell: ({ row }) => <span>{row.getValue("category")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "method",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Method"
        ></DataTableColumnHeader>
      ),
      cell: ({ row }) => <span>{row.getValue("method")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Amount"
        ></DataTableColumnHeader>
      ),
      cell: ({ row }) => <span>{formatAmount(row.getValue("amount"))}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Description"
        ></DataTableColumnHeader>
      ),
      cell: ({ row }) => (
        <span className="">{row.getValue("description")}</span>
      ),
      enableSorting: true,
    },
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
