"use client";
import React, { useEffect, useState } from "react";
import {
  fetchIncomeStatementIncomes,
  fetchIncomeStatementExpenses,
  fetchBalance,
} from "@/actions/fetch-admin-data";
import MonthSelector from "@/components/month-selector";
import AddressSelector from "@/components/address-selector";
import IncomeStatement from "@/components/statement";
import { Loader } from "lucide-react";
import { AccountBalanceCard } from "@/components/account-balance";

export default function AdminDashboard() {
  const defaultMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  const [data, setData] = useState<any>(null);

  // Address selection
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [balance, recentExpenses, recentIncomes] = await Promise.all([
        fetchBalance(selectedAddress),
        fetchIncomeStatementExpenses(selectedAddress, selectedMonth),
        fetchIncomeStatementIncomes(selectedAddress, selectedMonth),
      ]);

      const updatedBalance = balance?.[0]?.balance ?? 0;

      setData({ updatedBalance, recentExpenses, recentIncomes });
    };
    fetchData();
  }, [selectedAddress, selectedMonth]);

  const handleMonthAction = (month: string) => {
    setSelectedMonth(month);
  };

  const handleAddressAction = (address: string) => {
    setSelectedAddress(address);
  };

  if (!data) {
    return (
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10">
        <div className="absolute left-0 right-0 top-0 bottom-0 opacity-50" />
        <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
          <div className="p-5 bg-white rounded-lg justify-center items-center flex flex-col">
            <Loader className="animate-spin text-2xl mb-2" />
            <div className="text-sm">Loading</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      {/* Top selectors */}
      <div className="w-full flex md:justify-start">
        <AddressSelector
          defaultValue={selectedAddress}
          onAddressAction={handleAddressAction}
        />
        <div className="p-1.5" />
        <MonthSelector
          defaultValue={selectedMonth}
          onMonthAction={handleMonthAction}
        />
      </div>

      {/* Main content grid: Left for cards, Right for income statement */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Left Column: Account Balance Cards (stacked vertically) */}
        <div className="w-60 flex flex-col gap-4">
          <AccountBalanceCard balance={data.updatedBalance} currency="MXN" />
          <AccountBalanceCard balance={data.updatedBalance} currency="USD" />
        </div>

        {/* Right Column: Income Statement (occupies half of the page); rest left blank */}
        <div className="w-full">
          <IncomeStatement
            expenses={data.recentExpenses}
            incomes={data.recentIncomes}
            address={selectedAddress}
            month={selectedMonth}
          />
        </div>
      </div>
    </div>
  );
}
