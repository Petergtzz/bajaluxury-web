"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

type PieComponentProps = {
  pieData: { category: string; total_amount: number }[];
  month: string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: { payload: { category: string; total: number } }[];
  label?: string;
};

export function PieComponent({ pieData, month }: PieComponentProps) {
  const isMobile = useIsMobile();

  // Convert date to long format
  const [year, mon] = month.split("-");
  const displayedDate = new Date(Number(year), Number(mon) - 1, 1);

  const chartData = pieData.map((expense) => ({
    category: expense.category,
    total: expense.total_amount,
  }));

  const chartConfig = {
    total: { label: "Amount:" },
  } satisfies ChartConfig;

  const formatAmount = (amount: number) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const { category, total } = payload[0].payload;
      const color =
        COLORS[
          chartData.findIndex((item) => item.category === category) %
            COLORS.length
        ];

      return (
        <div className="bg-white dark:bg-gray-950 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <p className="tracking-tight text-sm font-semibold text-gray-900 dark:text-gray-100">
              {category}
            </p>
          </div>
          <p className="tracking-tight text-sm font-medium mt-1 text-gray-900 dark:text-gray-200">
            Amount: $ {formatAmount(total)} MXN
          </p>
        </div>
      );
    }
    return null;
  };

  const COLORS = [
    "#005f73ff",
    "#0a9396ff",
    "#94d2bdff",
    "#BFD5B2ff",
    "#e9d8a6ff",
    "#ee9b00ff",
    "#ca6702ff",
    "#bb3e03ff",
    "#ae2012ff",
    "#9b2226ff",
    "#001219ff",
  ];

  const totalAmount = chartData.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card className="tracking-tight text-sm font-medium">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>
          {displayedDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <PieChart
              margin={{
                top: 20,
                bottom: isMobile ? 30 : 20,
              }}
            >
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="category"
                labelLine={false}
                label={({ cx, cy, midAngle, outerRadius, value, index }) => {
                  const percentage = (value / totalAmount) * 100;
                  if (percentage <= 0.5) return null; // Hide labels for percentages < 0.05%

                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 25; // Move labels 20 units outside the pie
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill={COLORS[index % COLORS.length]} // Use the slice's color
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={14}
                    >
                      {`${percentage.toFixed(1)}%`}
                    </text>
                  );
                }}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {isMobile ? (
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "10px",
                    width: "80px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              ) : (
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "16px",
                    width: "150px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                />
              )}
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
