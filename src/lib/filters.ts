import { dataTableConfig } from "@/config/data-table";

export type TextOperator =
  (typeof dataTableConfig.textOperators)[number]["value"];
export type NumberOperator =
  (typeof dataTableConfig.numericOperators)[number]["value"];
export type DateOperator =
  (typeof dataTableConfig.dateOperators)[number]["value"];
export type FilterType = (typeof dataTableConfig.columnTypes)[number];

export interface AdvancedFilter {
  id: string;
  value: any;
  type: FilterType;
  operator: TextOperator | NumberOperator | DateOperator;
  filterId: string;
}

export function applyAdvancedFilter(row: any, columnId: string, value: any) {
  const { operator, payload, type } = value;
  const cellValue = row.getValue(columnId);

  switch (type) {
    case "text":
      switch (operator) {
        case "iLike":
          return String(cellValue)
            .toLowerCase()
            .includes(String(payload).toLowerCase());
        case "notILike":
          return !String(cellValue)
            .toLowerCase()
            .includes(String(payload).toLowerCase());
        case "eq":
          return String(cellValue) === String(payload);
        case "ne":
          return String(cellValue) !== String(payload);
        case "isEmpty":
          return !cellValue || String(cellValue).trim() === "";
        case "isNotEmpty":
          return !!cellValue && String(cellValue).trim() !== "";
        default:
          return true;
      }

    case "number":
      const numValue = parseFloat(cellValue);
      const numFilter = parseFloat(payload);
      switch (operator) {
        case "eq":
          return numValue === numFilter;
        case "ne":
          return numValue !== numFilter;
        case "lt":
          return numValue < numFilter;
        case "lte":
          return numValue <= numFilter;
        case "gt":
          return numValue > numFilter;
        case "gte":
          return numValue >= numFilter;
        case "isEmpty":
          return cellValue == null || cellValue === "";
        case "isNotEmpty":
          return cellValue != null && cellValue !== "";
        default:
          return true;
      }

    case "date":
      const dateValue = new Date(cellValue);
      const dateFilter = new Date(payload);
      switch (operator) {
        case "eq":
          return dateValue.getTime() === dateFilter.getTime();
        case "ne":
          return dateValue.getTime() !== dateFilter.getTime();
        case "lt":
          return dateValue < dateFilter;
        case "lte":
          return dateValue <= dateFilter;
        case "gt":
          return dateValue > dateFilter;
        case "gte":
          return dateValue >= dateFilter;
        case "isBetween":
          const [start, end] = payload.map((d: string) => new Date(d));
          return dateValue >= start && dateValue <= end;
        case "isEmpty":
          return !cellValue;
        case "isNotEmpty":
          return !!cellValue;
        default:
          return true;
      }

    default:
      return true;
  }
}

export function convertToColumnFilters(filters: AdvancedFilter[]) {
  return filters.map((filter) => ({
    id: filter.id,
    value: {
      operator: filter.operator,
      payload: filter.value,
      type: filter.type,
    },
  }));
}
