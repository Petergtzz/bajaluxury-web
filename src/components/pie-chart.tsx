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

type PieComponentProps = {
  monthlyExpenses: { category: string; total_amount: number }[];
};

export function PieComponent({ monthlyExpenses }: PieComponentProps) {
  const chartData = monthlyExpenses.map((expense) => ({
    category: expense.category,
    total: expense.total_amount,
  }));

  const chartConfig = {
    total: { label: "Amount:" },
  } satisfies ChartConfig;

  const COLORS = [
    "#005f73ff",
    "#0a9396ff",
    "#94d2bdff",
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
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <PieChart>
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="category"
                labelLine={false}
                label={({ value }) =>
                  `${((value / totalAmount) * 100).toFixed(1)}%`
                }
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
