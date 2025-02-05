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

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

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
                label={({ cx, cy, midAngle, outerRadius, value, index }) => {
                  const percentage = (value / totalAmount) * 100;
                  if (percentage <= 0.2) return null; // Hide labels for percentages < 0.01%

                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 20; // Move labels 20 units outside the pie
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
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={10}
                wrapperStyle={{ fontSize: "16px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
