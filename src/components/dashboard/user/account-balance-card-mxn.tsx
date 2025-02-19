import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/format-data";

type AccountBalanceCardProps = {
  balance: number;
};

export function AccountBalanceCardMxn({ balance }: AccountBalanceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="tracking-tight text-sm font-medium">
          Account Balance (MXN)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${balance >= 0 ? "text-green-800" : "text-red-800"}`}
        >
          ${formatNumber(balance)}
        </div>
      </CardContent>
    </Card>
  );
}
