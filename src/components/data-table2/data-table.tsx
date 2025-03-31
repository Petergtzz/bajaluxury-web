"use client";

import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction,
  Expense,
} from "@/types";
import * as React from "react";
import { getColumns } from "./expenses/expenses-columns";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTableComponent } from "./data-table-component";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableAdvancedToolbar } from "./data-table-advanced-toolbar";
import { UpdateDataTable } from "./update-data-table";

interface DataTableProps {
  data: {
    columns: string[];
    rows: any[];
  };
}

export function DataTable({ data }: DataTableProps) {
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<any> | null>(null);

  const rowsPerPage = 10;
  const pageCount = Math.ceil(data.rows.length / rowsPerPage);

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => getColumns({ setRowAction }),
    [],
  );

  const filterFields: DataTableFilterField<any>[] = [
    {
      id: "concept",
      label: "Concept",
      placeholder: "Filter concepts...",
    },
  ];

  const advancedFilterFields: DataTableAdvancedFilterField<any>[] = [
    {
      id: "house",
      label: "House",
      type: "text",
    },
    {
      id: "date",
      label: "Date",
      type: "date",
    },
    {
      id: "concept",
      label: "Concept",
      type: "text",
    },
    {
      id: "category",
      label: "Category",
      type: "text",
    },
    {
      id: "method",
      label: "Payment Method",
      type: "text",
    },
    {
      id: "amount",
      label: "Amount",
      type: "number",
    },
  ];

  const { table } = useDataTable({
    data: data.rows,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: "date", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTableComponent table={table}>
        <DataTableAdvancedToolbar
          table={table}
          filterFields={advancedFilterFields}
          shallow={false}
        ></DataTableAdvancedToolbar>
      </DataTableComponent>
      <UpdateDataTable
        open={rowAction?.type === "update"}
        onOpenChange={() => setRowAction(null)}
      />
    </>
  );
}
