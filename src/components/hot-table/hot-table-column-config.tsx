import { TextCell } from "@/components/hot-table/cells/text-cell";
import { DateCell } from "@/components/hot-table/cells/date-cell";
import { CurrencyCell } from "@/components/hot-table/cells/currency-cell";
import { NumberCell } from "@/components/hot-table/cells/numeric-cell";

type TableColumn = {
  accessorKey: string;
  header: string;
};

const getCellRenderer = (col: TableColumn) => {
  const CellRenderer: React.FC<{ cell: any }> = ({ cell }) => {
    const value = cell.getValue();
    const columnWidth = cell.column.getSize();

    switch (col.accessorKey) {
      case "text":
        return <TextCell value={value} />;
      case "date":
        return <DateCell value={value} />;
      case "amount":
        return <CurrencyCell value={value} />;
      case "balance":
        return <CurrencyCell value={value} />;
      case "number":
        return <NumberCell value={value} />;
      default:
    }
  };

  return CellRenderer;
};

export default getCellRenderer;
