"use client";
import React, { useEffect, useState } from "react";
import {
  fetchIncomeStatementIncomes,
  fetchIncomeStatementExpenses,
  fetchBalance,
} from "@/actions/fetch-admin-data";
import MonthSelector from "@/components/month-selector";
import AddressSelector from "@/components/overview/components/address-selector";
import IncomeStatement from "@/components/statement";
import { Loader, Search } from "lucide-react";
import { AccountBalanceCard } from "@/components/overview/components/account-balance";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const defaultMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState<string>(defaultMonth);

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
    if (month !== selectedMonth) setSelectedMonth(month);
  };

  const handleAddressAction = (address: string) => {
    if (address !== selectedAddress) setSelectedAddress(address);
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
      <div className="w-full flex md:justify-start items-center gap-4">
        <div className="relative w-full md:max-w-xs">
          <Input
            placeholder="Search & Filter"
            className="pl-8 pr-2 py-2 rounded"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 stroke-1" />
        </div>
        <AddressSelector
          defaultValue={selectedAddress}
          onAddressAction={handleAddressAction}
        />
        <MonthSelector
          defaultValue={selectedMonth}
          onMonthAction={handleMonthAction}
        />
      </div>

      {/* Balance Cards arranged side by side */}
      <div className="mt-4 flex flex-row gap-4">
        <AccountBalanceCard balance={data.updatedBalance} currency="MXN" />
        <AccountBalanceCard balance={data.updatedBalance} currency="USD" />
      </div>

      {/* Income Statement */}
      <div className="mt-4">
        <IncomeStatement
          expenses={data.recentExpenses}
          incomes={data.recentIncomes}
          address={selectedAddress}
          month={selectedMonth}
        />
      </div>
    </div>
  );
}
