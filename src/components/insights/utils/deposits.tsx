import { formatAmount } from "@/lib/formatter";
import { Text, Heading } from "@radix-ui/themes";

type DepositsProps = {
  amount: number;
  month: string;
};

export default function Deposits({ amount, month }: DepositsProps) {
  const [year, mon] = month.split("-");
  const displayedDate = new Date(Number(year), Number(mon) - 1, 1);

  return (
    <div className="flex flex-col justify-between md:w-[150px]">
      <Heading as="h1" className="tracking-tight text-sm font-medium">
        {displayedDate.toLocaleDateString("default", {
          month: "long",
        })}{" "}
        Deposits
      </Heading>
      <div className="flex-grow" />
      <Text className="text-2xl font-normal">
        {amount ? formatAmount(amount) : "$0.00"}
      </Text>
    </div>
  );
}
