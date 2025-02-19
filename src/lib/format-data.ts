export const formatNumber = (num: number) => {
  if (!num) return num;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
