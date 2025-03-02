import { ArrowDown, ArrowUp, ChevronsUpDown, X } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HotTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function HotTableColumnHeader<TData, TValue>({
  column,
  title,
}: HotTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className="text-left">{title}</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-left" style={{ textTransform: "capitalize" }}>
        {title}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent"
          >
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="w-4 h-4 stroke-1" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="w-4 h-4 stroke-1" />
            ) : (
              <ChevronsUpDown className="w-4 h-4 stroke-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="w-4 h-4 stroke-1" />
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="w-4 h-4 stroke-1" />
            Descending
          </DropdownMenuItem>
          {column.getIsSorted() && (
            <DropdownMenuItem onClick={() => column.clearSorting()}>
              <X className="w-4 h-4 stroke-1" />
              Clear Sorting
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
