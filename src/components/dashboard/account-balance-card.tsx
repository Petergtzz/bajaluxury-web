import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AccountBalanceCard = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-2xl font-medium tracking-tight">
        Account Balance
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
    </CardContent>
  </Card>
);
