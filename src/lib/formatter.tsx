import { DateTime } from "luxon";

export const formatAmount = (value: any) => {
  if (value === 0) return "$0.00";
  if (!value) return null;
  const amount = parseFloat(value);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formatted;
};

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
