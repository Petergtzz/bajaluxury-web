import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AccountBalanceCardProps = {
  balance: number;
};

export function AccountBalanceCard({ balance }: AccountBalanceCardProps) {
  return (
    <Card className="w-60 my-5">
      <CardHeader className="flex flex-row pb-2">
        <CardTitle className="tracking-tight text-lg font-medium">
          Account Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${balance >= 0 ? "text-green-800" : "text-red-800"}`}
        >
          $
          {balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </CardContent>
    </Card>
  );
}
