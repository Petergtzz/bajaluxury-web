import {
  ChevronDown,
  DownloadIcon,
  Delete,
  Plus,
  SaveAll,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportTableToCSV } from "@/lib/export";

type ActionButtonProps = {
  table: any;
  isAdmin: boolean;
};

export function ActionButtons({ table, isAdmin }: ActionButtonProps) {
  function handleAddEntry() {
    console.log("Add Entry");
  }

  return (
    <div className="flex felx-col sm:flex-row items-center gap-3 ml-auto">
      {/* ONLY show this to admin*/}
      {isAdmin && (
        <>
          <div className="flex justify-end gap-3">
            <Button variant="ghost">
              <SaveAll size={16} strokeWidth={1.0} />
              Commit
            </Button>
            <Button variant="ghost" className="text-red-500">
              Discard Change
            </Button>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={handleAddEntry}>
              <Plus size={16} strokeWidth={1.0} color="#52ac5f" />
            </Button>
            <Button variant="ghost">
              <Delete size={16} strokeWidth={1.0} color="#d42318" />
            </Button>
            <Button variant="ghost">
              <RefreshCcw size={16} strokeWidth={1.0} color="#52ac5f" />
            </Button>
          </div>
        </>
      )}

      {/* Always show this -- user or admin*/}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Columns <ChevronDown size={16} strokeWidth={1.0} />
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
