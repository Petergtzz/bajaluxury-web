"use client";

import React, { useEffect, useState } from "react";
import { AccountBalanceCardMxn } from "./account-balance-card-mxn";
import { PieComponent } from "./pie-chart";
import { AccountBalanceCardUsd } from "./account-balance-card-usd";
import { IncomeStatement } from "./income-statement";
import MonthSelector from "@/components/month-selector";
import {
  fetchBalance,
  fetchPieData,
  fetchIncomeStatementData,
} from "@/actions/fetch-user-data";

type UserBalanceContentProps = {
  houseId: number;
};

export default function UserBalanceContent({
  houseId,
}: UserBalanceContentProps) {
  const defaultMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState<string>(defaultMonth);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [balance, pieData, incomeStatementData] = await Promise.all([
        fetchBalance(houseId),
        fetchPieData(houseId, selectedMonth),
        fetchIncomeStatementData(houseId, selectedMonth),
      ]);

      const updatedBalance = balance?.[0]?.balance ?? 0;

      setData({ updatedBalance, pieData, incomeStatementData });
    };
    fetchData();
  }, [houseId, selectedMonth]);

  const handleMonthAction = (month: string) => {
    setSelectedMonth(month);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full flex flex-col">
      {/* Month Selector */}
      <div className="w-full flex justify-end">
        <MonthSelector
          defaultValue={selectedMonth}
          onMonthAction={handleMonthAction}
        />
      </div>
      <div className="w-full my-5 flex flex-col md:flex-row gap-4">
        {/* Income Statement - Takes Full Height */}
        <div className="w-full md:w-1/2 flex flex-col">
          <IncomeStatement monthlyExpenses={data.incomeStatementData} />
        </div>

        {/* Right Side: Balance Cards & Pie Chart */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Balance Cards - Side by Side */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-1/2">
              <AccountBalanceCardUsd balance={data.updatedBalance} />
            </div>
            <div className="w-full md:w-1/2">
              <AccountBalanceCardMxn balance={data.updatedBalance} />
            </div>
          </div>
          {/* Pie Chart - Same Width as Balance Cards */}
          <div className="w-full">
            <PieComponent pieData={data.pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}
