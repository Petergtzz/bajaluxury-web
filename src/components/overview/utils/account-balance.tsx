import { formatAmount } from "@/lib/formatter";
import { exchangeRate } from "@/constants/exchange-rate";
import { Text, Heading } from "@radix-ui/themes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type AccountBalanceProps = {
  balance: number;
  currency: string;
};

export function AccountBalance({ balance, currency }: AccountBalanceProps) {
  const isUsd = currency ? currency === "USD" : false;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="tracking-tight text-sm font-medium">
          Account Balance ({currency})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text
          className={`text-2xl font-normal ${
            balance >= 0 ? "text-green-600" : "text-red-700"
          }`}
        >
          {isUsd ? formatAmount(balance / exchangeRate) : formatAmount(balance)}
        </Text>
      </CardContent>
    </Card>
  );
}
