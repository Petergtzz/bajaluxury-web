import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountBalanceCard } from "@/components/dashboard/account-balance-card";
import { ChartCard } from "@/components/dashboard/chart-card";

export function BalancesContent() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Balances Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Admin-specific balances content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
