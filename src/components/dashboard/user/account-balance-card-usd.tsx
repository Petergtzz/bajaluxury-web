import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AccountBalanceCardProps = {
  balance: number;
};

export function AccountBalanceCardUsd({ balance }: AccountBalanceCardProps) {
  const exchangeRate = 19.0;
  const balanceInUsd = balance / exchangeRate;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="tracking-tight text-sm font-medium">
          Account Balance (USD)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${balanceInUsd >= 0 ? "text-green-800" : "text-red-800"}`}
        >
          $
          {balanceInUsd.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </CardContent>
    </Card>
  );
}
