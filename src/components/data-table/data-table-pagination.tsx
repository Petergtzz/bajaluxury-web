import { useState } from "react";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataPaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataPagination<TData>({
  table,
  pageSizeOptions = [10, 40, 80, 160, 320],
}: DataPaginationProps<TData>) {
  const [selectedPageSize, setSelectedPageSize] = useState(
    table.getState().pagination.pageSize,
  );

  return (
    <div className="flex w-full flex-col-reverse items-center justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap tracking-tight text-sm font-medium">
            Rows per page
          </p>
          <Select
            value={`${selectedPageSize}`}
            onValueChange={(value) => {
              const newSize = Number(value);
              setSelectedPageSize(newSize);
              table.setPageIndex(0);
              table.setPageSize(newSize);
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={selectedPageSize} />
            </SelectTrigger>
            <SelectContent
              side="top"
              className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
            >
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center tracking-tight text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" size={16} strokeWidth={1.0} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" size={16} strokeWidth={1.0} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" size={16} strokeWidth={1.0} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" size={16} strokeWidth={1.0} />
          </Button>
        </div>
      </div>
    </div>
  );
}
