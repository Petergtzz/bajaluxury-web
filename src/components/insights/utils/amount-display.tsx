import { formatAmount } from "@/lib/formatter";
import { Text, Heading } from "@radix-ui/themes";

type AccountDisplayProps = {
  amount: number;
  month: string;
};

export default function AmountDisplay({ amount, month }: AccountDisplayProps) {
  const [year, mon] = month.split("-");
  const displayedDate = new Date(Number(year), Number(mon) - 1, 1);

  return (
    <div className="flex flex-col justify-between ">
      <Heading as="h1" className="tracking-tight text-sm font-medium">
        {displayedDate.toLocaleDateString("default", {
          month: "long",
        })}{" "}
        Spend
      </Heading>
      <div className="flex-grow" />
      <Text className="m1-3 text-3xl font-bol">{formatAmount(amount)}</Text>
    </div>
  );
}
