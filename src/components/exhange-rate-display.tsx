import { exchangeRate } from "@/constants/exchange-rate";
import { formatAmount } from "@/lib/formatter";

export function ExchangeRateDisplay() {
  return (
    <div className="flex flex-col text-xs dark:text-white pt-7">
      <span className="font-normal">Exchange Rate</span>
      <span className="font-semibold">{formatAmount(exchangeRate)}</span>
    </div>
  );
}
