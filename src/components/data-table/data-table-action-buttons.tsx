import { useState, useCallback } from "react";
import {
  ChevronDown,
  DownloadIcon,
  Delete,
  Plus,
  SaveAll,
  RefreshCcw,
  Usb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toolbar, ToolbarButton } from "@/components/data-table/tool-bar";
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
  const [changeNumber, setChangeNumber] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const onCommit = async () => {
    setChangeNumber(0);
  };

  const onDiscard = () => {
    setChangeNumber(0);
  };

  const onNewRow = useCallback(() => {
    table.addRow();
  }, [table]);

  return (
    <div className="flex felx-col sm:flex-row gap-3 ml-auto">
      {/* ONLY show this to admin*/}
      {isAdmin && (
        <Toolbar>
          <ToolbarButton
            text="Commit"
            icon={<SaveAll size={16} strokeWidth={1.0} />}
            disabled={!changeNumber || isExecuting}
            loading={isExecuting}
            onClick={onCommit}
            badge={changeNumber ? changeNumber.toString() : ""}
          />
          <ToolbarButton
            text="Discard Change"
            destructive
            disabled={!changeNumber}
            onClick={onDiscard}
          />

          <Button variant="ghost">
            <Plus className="text-green-600" size={16} strokeWidth={1.0} />
          </Button>
          <Button variant="ghost">
            <Delete className="text-red-600" size={16} strokeWidth={1.0} />
          </Button>
          <Button variant="ghost">
            <RefreshCcw
              className="text-green-600"
              size={16}
              strokeWidth={1.0}
            />
          </Button>
        </Toolbar>
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
