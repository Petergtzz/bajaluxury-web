"use client";
import React, { useEffect, useState } from "react";
import { fetchDashboard } from "@/actions/fetch-admin-data";
import { TableComponent } from "@/components/data-table/data-table";
import MonthSelector from "@/components/month-selector";
import AddressSelector from "@/components/address-selector";

export default function AdminDashboard() {
  const defaultMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  const [data, setData] = useState<any>(null);

  // Address selection
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [recentTransactions] = await Promise.all([
        fetchDashboard(selectedAddress, selectedMonth),
      ]);
      setData({ recentTransactions });
    };
    fetchData();
  }, [selectedAddress, selectedMonth]);

  const handleMonthAction = (month: string) => {
    setSelectedMonth(month);
  };

  const handleAddressAction = (address: string) => {
    setSelectedAddress(address);
  };

  return (
    <div>
      <div className="pt-5 flex-row md:justify-start ">
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
      <div className="pt-5 flex-row md:justify-start "></div>
    </div>
  );
}
