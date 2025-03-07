import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
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

  const chartConfig = {
    total: { label: "Amount:" },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
