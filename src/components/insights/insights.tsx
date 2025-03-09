"use client";
import {
  fetchTotalDepositAmount,
  fetchTotalSpendAmount,
} from "@/actions/fetch-admin-data";
import AddressSelector from "@/components/address-selector";
import MethodSelector from "@/components/method-selector";
import MonthSelector from "@/components/month-selector";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AlertDestructive } from "../error-message";
import Loading from "../loading-component";
import { useClientSession } from "../session-client-provider";
import Deposits from "./utils/deposits";
import Spend from "./utils/spend";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import BarComponent from "./utils/bar-chart";

export default function Insights() {
  const session = useClientSession();
  const defaultMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState<string>(defaultMonth);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(1);
  const [selectedMethod, setSelectedMethod] = useState<string>("cash");

  // Check if user is admin
  const isAdmin = session?.role === "admin";
  // Handle user houseId
  const houseId = isAdmin ? (selectedAddress ?? -1) : (session?.houseId ?? -1);

  const {
    data: accountSpend,
    error: spendError,
    isError: isSpendError,
    isPending: isSpendPending,
  } = useQuery({
    queryKey: ["accountSpend", houseId, selectedMonth, selectedMethod],
    queryFn: () =>
      fetchTotalSpendAmount(houseId ?? -1, selectedMonth, selectedMethod),
    enabled: houseId !== null && houseId !== undefined,
  });

  const {
    data: accountDeposits,
    error: depositError,
    isError: isDepositError,
    isPending: isDepositPending,
  } = useQuery({
    queryKey: ["accountDeposits", houseId, selectedMonth],
    queryFn: () => fetchTotalDepositAmount(houseId ?? -1, selectedMonth),
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

  const handleMethodAction = (method: string) => {
    setSelectedMethod(method);
  };

  if (isSpendError || isDepositError) {
    return (
      <AlertDestructive
        message={spendError?.message || depositError?.message}
      />
    );
  }

  if (isSpendPending || isDepositPending) {
    return <Loading />;
  }

  return (
    <div className="py-0">
      <div className="w-full flex justify-end items-center gap-6">
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
        <MethodSelector
          defaultValue={selectedMethod}
          onMethodAction={handleMethodAction}
        />
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-14">
        <Spend
          amount={accountSpend?.[0]?.total_amount ?? 0}
          month={selectedMonth}
        />
        <Deposits
          amount={accountDeposits?.[0]?.total_amount ?? 0}
          month={selectedMonth}
        />
      </div>

      <div className="mt-6">
        <BarComponent house_id={houseId} month={selectedMonth} />
      </div>
    </div>
  );
}
