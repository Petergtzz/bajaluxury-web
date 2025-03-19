import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { AlertDestructive } from "@/components/error-message";
import Loading from "@/components/loading-component";
import { fetchBarLineData } from "@/actions/fetch-turso-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatAmount } from "@/lib/formatter";
import { COLORS } from "@/constants/colors";
import CustomTooltip from "@/components/custom-tooltip";
import { Label } from "@/components/ui/label";

type BarComponentProps = {
  house_id: number;
  month: string;
};

export default function LineComponent({ house_id, month }: BarComponentProps) {
  const isMobile = useIsMobile();

  // Convert date to long format
  const [year, mon] = month.split("-");
  const displayedDate = new Date(Number(year), Number(mon) - 1, 1);

  const {
    data: barData,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["barData", house_id, month],
    queryFn: () => fetchBarLineData(house_id, month),
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

  const chartData = barData.map((expense) => ({
    house: expense.house,
    month: expense.month,
    total_cash_amount: expense.total_cash_amount,
    total_credit_card_amount: expense.total_credit_card_amount,
    total_check_amount: expense.total_check_amount,
    total_amount: expense.total_amount,
  }));

  const chartConfig = {
    total: { label: "Total:" },
  } satisfies ChartConfig;

  const formatYAxisValue = (value: number) => {
    if (value >= 1_000_000) {
      return value / 1_000_000 + "M";
    } else if (value >= 1_000) {
      return value / 1_000 + "k";
    }
    return value.toString();
  };

  const formatLegend = (value: string) => {
    switch (value) {
      case "total_cash_amount":
        return "Cash";
      case "total_credit_card_amount":
        return "Credit Card";
      case "total_check_amount":
        return "Check";
      default:
        return value;
    }
  };

  return (
    <ChartContainer config={chartConfig}>
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            const [year, mon] = value.split("-");
            const displayedDate = new Date(Number(year), Number(mon) - 1, 1);
            return displayedDate.toLocaleString("default", {
              month: "long",
            });
          }}
        />
        <YAxis
          dataKey="total_amount"
          tickLine={false}
          tickFormatter={formatYAxisValue}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="top"
          formatter={formatLegend}
          iconType="circle"
          iconSize={10}
        />
        <Line
          type="monotone"
          dataKey="total_cash_amount"
          stroke={COLORS[0]} // Define appropriate color for cash
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="total_credit_card_amount"
          stroke={COLORS[2]} // Define appropriate color for credit card
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="total_check_amount"
          stroke={COLORS[4]} // Define appropriate color for credit card
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
