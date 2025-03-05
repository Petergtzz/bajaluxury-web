"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBalance, fetchTotalCashAmount } from "@/actions/fetch-admin-data";
import MonthSelector from "@/components/month-selector";
import AddressSelector from "@/components/overview/components/address-selector";
import IncomeStatement from "@/components/statement";
import { Loader, Search } from "lucide-react";
import { AccountBalance } from "@/components/overview/components/account-balance";
import { Input } from "@/components/ui/input";
import { useClientSession } from "../session-client-provider";
import Loading from "../loading-component";
import { ExchangeRateDisplay } from "./components/exhange-rate-display";

export default function Overview() {
  const session = useClientSession();
  const defaultMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState<string>(defaultMonth);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(1);

  // Check if user is admin
  const isAdmin = session?.role === "admin";

  // Handle user houseId
  const houseId = isAdmin ? (selectedAddress ?? -1) : (session?.houseId ?? -1);

  const {
    data: accountBalance,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["accountBalance", houseId],
    queryFn: () => fetchBalance(houseId ?? -1),
    enabled: houseId !== null && houseId !== undefined,
  });

  useEffect(() => {
    // Set the default address if the user is not an admin
    if (!isAdmin && session?.houseId) {
      setSelectedAddress(session.houseId);
    }
  }, [isAdmin, session]);

  const handleMonthAction = (month: string) => {
    setSelectedMonth(month);
  };

  const handleAddressAction = (houseId: number) => {
    setSelectedAddress(houseId);
  };

  if (isError) {
    return <div>Error</div>;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="py-2">
      <div className="w-full flex justify-start items-center gap-4">
        <div className="relative w-full max-w-xs">
          <Input placeholder="Search..." className="pl-8 pr-2" />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 stroke-1" />
        </div>
        {isAdmin && (
          <AddressSelector
            defaultValue={selectedAddress ?? 0}
            onAddressAction={handleAddressAction}
          />
        )}
        <MonthSelector
          defaultValue={selectedMonth}
          onMonthAction={handleMonthAction}
        />
        <ExchangeRateDisplay />
      </div>

      <div className="mt-8 flex flex-row gap-14">
        <AccountBalance
          balance={
            accountBalance && accountBalance.length > 0
              ? accountBalance[0].balance
              : 0
          }
          currency="MXN"
        />
        <AccountBalance
          balance={
            accountBalance && accountBalance.length > 0
              ? accountBalance[0].balance
              : 0
          }
          currency="USD"
        />
      </div>

      <div className="mt-8">
        <IncomeStatement house_id={houseId} month={selectedMonth} />
      </div>
    </div>
  );
}
