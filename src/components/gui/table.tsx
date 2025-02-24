"use client";

import { useEffect, useState } from "react";
import { useDatabaseDriver } from "@/context/driver-provider";
import {
  SaveAll,
  Filter,
  Plus,
  Delete,
  RefreshCcw,
  ChevronDown,
  DownloadIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toolbar, ToolbarButton } from "../gui/tool-bar";
import { DatabaseResultSet } from "@/drivers/base-driver";
import { Console } from "console";
import OptimizeTableState from "./table-optimized/table-optimized";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "../ui/select";

interface TablePanelProps {
  tableName: string;
  schemaName?: string;
}

export default function TablePanel({ tableName, schemaName }: TablePanelProps) {
  console.log("TablePanel mounted, tableName:", tableName);
  const { databaseDriver } = useDatabaseDriver();
  const [error, setError] = useState<string>();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DatabaseResultSet>();
  const [changeNumber, setChangeNumber] = useState(0);

  const [where, setWhere] = useState("");
  const [whereInput, setWhereInput] = useState("");

  const [offset, setOffset] = useState("0");
  const [limit, setLimit] = useState("50");

  const [finalOffset, setFinalOffset] = useState(0);
  const [finalLimit, setFinalLimit] = useState(50);
  const [isExecuting, setIsExecuting] = useState(false);

  const [revision, setRevision] = useState(1);
  const [lastQueryTimestamp, setLastQueryTimestamp] = useState(0);

  console.log("Database driver:", databaseDriver);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data: dataResult } = await databaseDriver.selectTable(
          tableName,
          { whereRaw: where, limit: finalLimit },
        );

        console.log(dataResult);

        const tableState = OptimizeTableState.createFromResult({
          driver: databaseDriver,
          result: dataResult,
        });

        tableState.setSql("SELECT * FROM " + tableName + ";");

        setData(dataResult);
        setChangeNumber(0);
        setError(undefined);
      } catch (e) {
        setError((e as Error).toString());
      } finally {
        setLoading(false);
      }
    };
    fetchData().then().catch(console.error);
  }, [tableName, where, finalLimit, databaseDriver]);

  const handleLimitChange = (finalLimit: number) => {
    setFinalLimit(finalLimit);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="shrink-0 grow-0 border-b border-neutral-200 py-2 dark:border-neutral-800">
        <Toolbar>
          <ToolbarButton
            text="Commit"
            icon={<SaveAll className="h-4 w-4 stroke-1" />}
          />

          <ToolbarButton text="Discard Change" destructive />

          <div className="mx-1">
            <Separator orientation="vertical" />
          </div>

          <Button variant={"ghost"}>
            <Plus className="h-4 w-4 stroke-1 text-green-600" />
          </Button>

          <Button variant={"ghost"}>
            <Delete className="h-4 w-4 stroke-1 text-red-600" />
          </Button>

          <Button
            variant={"ghost"}
            onClick={() => setRevision((prev) => prev + 1)}
            disabled={loading}
          >
            <RefreshCcw className="h-4 w-4 stroke-1 text-green-600" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="h-4 w-4 stroke-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"></DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 stroke-1" />
            Export
          </Button>
        </Toolbar>
      </div>
    </div>
  );
}
