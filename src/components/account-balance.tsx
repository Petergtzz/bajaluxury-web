import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/formatter";
import { exchangeRate } from "@/constants/exchange-rate";

type AccountBalanceCardProps = {
  balance: number;
  currency: string;
};

export function AccountBalanceCard({
  balance,
  currency,
}: AccountBalanceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="tracking-tight text-sm font-medium">
          Account Balance ({currency})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${balance >= 0 ? "text-green-800" : "text-red-800"}`}
        >
          {formatAmount(balance)}
        </div>
      </CardContent>
    </Card>
  );
}
