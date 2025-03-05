import { exchangeRate } from "@/constants/exchange-rate";
import { formatAmount } from "@/lib/formatter";

export function ExchangeRateDisplay() {
  return (
    <div>
      <h1>
        Exhange Rate:
        {formatAmount(exchangeRate)}
      </h1>
    </div>
  );
}
