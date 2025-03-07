import { exchangeRate } from "@/constants/exchange-rate";
import { formatAmount } from "@/lib/formatter";

export function ExchangeRateDisplay() {
  return (
    <div className="flex flex-col text-xs text-gray-700 dark:text-white pt-7">
      <span className="font-semibold">Exchange Rate</span>
      <span>{formatAmount(exchangeRate)}</span>
    </div>
  );
}
