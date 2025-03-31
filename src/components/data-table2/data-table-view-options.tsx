"use client";

import { exportTableToCSV } from "@/lib/export";
import type { Table } from "@tanstack/react-table";
import { ChevronDown, DownloadIcon, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className="flex felx-col sm:flex-row items-center gap-2 ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings2 className="w-4 h-4 stroke-1" />
            View <ChevronDown className="w-4 h-4 stroke-1" />
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
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="sm"
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
  );
}
