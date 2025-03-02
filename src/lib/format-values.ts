import { DateTime } from "luxon";

export const formatAmount = (value: any) =>
  typeof value === "number"
    ? `$ ${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : `$0.00`;

export const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = DateTime.fromISO(value);
  if (!date.isValid) return "Invalid Date";
  return date.toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
