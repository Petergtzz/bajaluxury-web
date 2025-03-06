import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchAreaChart } from "@/actions/fetch-admin-data";
import Loading from "@/components/loading-component";
import { COLORS } from "@/constants/colors";

const data = [
  {
    date: "Nov 01",
    Cards: 5000,
    Reimbursements: 7000,
    ACH: 3000,
    Checks: 4000,
    Wires: 2000,
  },
  {
    date: "Nov 02",
    Cards: 8000,
    Reimbursements: 9000,
    ACH: 6000,
    Checks: 7000,
    Wires: 4000,
  },
  {
    date: "Nov 03",
    Cards: 10000,
    Reimbursements: 11000,
    ACH: 7000,
    Checks: 8000,
    Wires: 5000,
  },
  {
    date: "Nov 04",
    Cards: 13245.14,
    Reimbursements: 14245.14,
    ACH: 8245.14,
    Checks: 8245.14,
    Wires: 8245.14,
  },
];

type StackedAreaChartProps = {
  houseId: number;
  month: string;
  method: string;
};

export default function StackedAreaChart({
  houseId,
  month,
  method,
}: StackedAreaChartProps) {
  // Convert date to long format
  const [year, mon] = month.split("-");
  const displayedDate = new Date(Number(year), Number(mon) - 1, 1);

  const {
    data: chartData,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["chartData", houseId, month, method],
    queryFn: () => fetchAreaChart(houseId, month, method),
    enabled: houseId !== null && houseId !== undefined,
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isPending) {
    return <Loading />;
  }

  const data = chartData.map((expense) => ({
    date: expense.date,
    category: expense.category,
    total: expense.total_amount,
  }));

  const chartConfig = {
    total: { label: "Amount:" },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>maybe</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="" />
              <Tooltip />
              <Legend />
              {Object.keys(data[0] ?? {}).map(
                (key) =>
                  key !== "date" && (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stackId="1"
                      stroke={COLORS[key] ?? "#ccc"}
                      fill={COLORS[key] ?? "#ccc"}
                    />
                  ),
              )}
              <ReferenceDot
                x="Nov 04"
                y={13245.14}
                r={5}
                fill="black"
                stroke="black"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
