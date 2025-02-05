"use client";

import React, { useState, useEffect } from "react";
import {
  fetchUserBalances,
  fetchUserCategoriesAndConcepts,
} from "@/lib/fetchuser";
import { AccountBalanceCardMxn } from "./account-balance-card-mxn";
import { getSession } from "@/lib/session";
import { PieComponent } from "./pie-chart";
import { AccountBalanceCardUsd } from "./account-balance-card-usd";
import { IncomeStatement } from "./income-statement";

interface UserBalance {
  balance: number;
}

interface ExpenseData {
  category: string;
  concept: string;
  total_amount: number;
  category_total: number;
}

export function IncomeDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(getMonthOptions()[0]);
  const [balances, setBalances] = useState<UserBalance[]>([]);
  const [categoryAndConceptExpense, setCategoryAndConceptExpense] = useState<
    ExpenseData[]
  >([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/session");
      const sessionData = await res.json();
      if (
        !sessionData ||
        sessionData.role !== "user" ||
        typeof sessionData.houseId !== "number"
      ) {
        console.error("User session or houseId is missing.");
        return;
      }
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  // Fetch data when session is available and selectedMonth changes
  useEffect(() => {
    if (!session || typeof session.houseId !== "number") return;

    async function fetchData() {
      const monthOffset = selectedMonth.offset;
      const [newBalances, newCategoryAndConceptExpense] = await Promise.all([
        fetchUserBalances(session.houseId),
        fetchUserCategoriesAndConcepts(session.houseId, monthOffset),
      ]);
      setBalances(newBalances);
      setCategoryAndConceptExpense(newCategoryAndConceptExpense);
    }

    fetchData();
  }, [selectedMonth, session]);

  const balance = balances?.[0]?.balance ?? 0;

  const pieChartData = Object.values(
    categoryAndConceptExpense.reduce(
      (acc, { category, category_total }) => {
        acc[category] = { category, category_total };
        return acc;
      },
      {} as Record<string, { category: string; category_total: number }>,
    ),
  );

  const incomeStatementData = categoryAndConceptExpense.map(
    ({ category, concept, total_amount }) => ({
      category,
      concept,
      total_amount,
    }),
  );

  return (
    <div className="relative w-full my-5 flex flex-col md:flex-row gap-4">
      {/* Dropdown Button for Month Selection */}
      <div className="absolute top-0 right-0">
        <select
          className="p-2 border rounded-md shadow-sm"
          value={selectedMonth.value}
          onChange={(e) =>
            setSelectedMonth(
              getMonthOptions().find((m) => m.value === e.target.value)!,
            )
          }
        >
          {getMonthOptions().map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

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

function getMonthOptions() {
  const months = [];
  const currentDate = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    months.push({
      label: date.toLocaleString("default", { month: "long", year: "numeric" }),
      value: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`,
      offset: i, // Store the numerical month offset
    });
  }
  return months;
}
