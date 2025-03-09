"use client";
import {
  Bar,
  BarChart,
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
import { fetchBarData } from "@/actions/fetch-admin-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatAmount } from "@/lib/formatter";
import { COLORS } from "@/constants/colors";

type BarComponentProps = {
  house_id: number;
  month: string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: { total_cash_amount: number; total_credit_card_amount: number };
  }[];
  label?: string;
};

export default function BarComponent({ house_id, month }: BarComponentProps) {
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
    queryFn: () => fetchBarData(house_id, month),
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
    total_amount: expense.total_amount,
  }));

  const chartConfig = {
    total: { label: "Total:" },
  } satisfies ChartConfig;

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const { total_cash_amount, total_credit_card_amount } =
        payload[0].payload;

      return (
        <div className="bg-white dark:bg-gray-950 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          {/* Cash Amount */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-900 dark:text-gray-200">
              <span className="mr-2" style={{ color: COLORS[0] }}>
                ●
              </span>
              Cash:{" "}
            </div>
            <div className="text-gray-900 dark:text-gray-200 ml-2">
              {formatAmount(total_cash_amount)} MXN
            </div>
          </div>

          {/* Credit Card Amount */}
          <div className="flex items-center justify-between mt-1">
            <div className="text-gray-900 dark:text-gray-200">
              <span className="mr-2" style={{ color: COLORS[2] }}>
                ●
              </span>
              Credit Card:{" "}
            </div>
            <div className="text-gray-900 dark:text-gray-200 ml-2">
              {formatAmount(total_credit_card_amount)} MXN
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

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
      default:
        return value;
    }
  };

  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={true}
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
        <Bar
          dataKey="total_cash_amount"
          stackId="a"
          fill={COLORS[0]}
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="total_credit_card_amount"
          stackId="a"
          fill={COLORS[2]}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
