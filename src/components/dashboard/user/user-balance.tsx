import React, { useState } from "react";
import {
  fetchUserBalances,
  fetchPieData,
  fetchIncomeData,
} from "@/lib/fetchuser";
import { AccountBalanceCardMxn } from "./account-balance-card-mxn";
import { getSession } from "@/lib/session";
import { PieComponent } from "./pie-chart";
import { AccountBalanceCardUsd } from "./account-balance-card-usd";
import { IncomeStatement } from "./income-statement";

export async function UserBalanceContent() {
  const session = await getSession();
  if (
    !session ||
    session.role !== "user" ||
    typeof session.houseId !== "number"
  ) {
    throw new Error("User session or houseId is missing.");
  }

  const [balances, pieData, statementData] = await Promise.all([
    fetchUserBalances(session.houseId),
    fetchPieData(session.houseId),
    fetchIncomeData(session.houseId),
  ]);

  const balance = balances?.[0]?.balance ?? 0;

  const pieChartData = pieData.map(({ category, total_amount }) => ({
    category,
    total_amount,
  }));

  const incomeStatementData = statementData.map(
    ({ category, concept, total_amount }) => ({
      category,
      concept,
      total_amount,
    }),
  );

  return (
    <div className="relative w-full my-5 flex flex-col md:flex-row gap-4">
      {/* Income Statement - Takes Full Height */}
      <div className="w-full md:w-1/2 flex flex-col">
        <IncomeStatement monthlyExpenses={incomeStatementData} />
      </div>

      {/* Right Side: Balance Cards & Pie Chart */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Balance Cards - Side by Side */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <AccountBalanceCardUsd balance={balance} />
          </div>
          <div className="w-full md:w-1/2">
            <AccountBalanceCardMxn balance={balance} />
          </div>
        </div>
        {/* Pie Chart - Same Width as Balance Cards */}
        <div className="w-full">
          <PieComponent monthlyExpenses={pieChartData} />
        </div>
      </div>
    </div>
  );
}
