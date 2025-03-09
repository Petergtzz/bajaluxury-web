import { formatAmount } from "@/lib/formatter";
import { exchangeRate } from "@/constants/exchange-rate";
import { Text, Heading } from "@radix-ui/themes";

type AccountBalanceProps = {
  balance: number;
  currency: string;
};

export function AccountBalance({ balance, currency }: AccountBalanceProps) {
  const isUsd = currency ? currency === "USD" : false;

  return (
    <div className="flex flex-col justify-between ">
      <Heading as="h1" className="tracking-tight text-sm font-normal">
        Account Balance ({currency})
      </Heading>
      <div className="flex-grow" />
      <Text
        className={`text-3xl font-normal ${
          balance >= 0 ? "text-green-600" : "text-red-700"
        }`}
      >
        {isUsd ? formatAmount(balance / exchangeRate) : formatAmount(balance)}
      </Text>
    </div>
  );
}
