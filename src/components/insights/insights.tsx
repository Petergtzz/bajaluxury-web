"use client";
import {
  fetchTotalDepositAmount,
  fetchTotalSpendAmount,
} from "@/actions/fetch-admin-data";
import MonthSelector from "@/components/month-selector";
import AddressSelector from "@/components/overview/components/address-selector";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../loading-component";
import { useClientSession } from "../session-client-provider";
import MethodSelector from "@/components/overview/components/method-selector";
import Spend from "./utils/spend";
import { AlertDestructive } from "../error-message";
import Deposits from "./utils/deposits";

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

  console.log(selectedMethod);

  return (
    <div className="py-0">
      <div className="w-full flex justify-start items-center gap-4">
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

      <div className="mt-8 flex flex-row gap-14">
        <Spend
          amount={accountSpend?.[0]?.total_amount ?? 0}
          month={selectedMonth}
        />
        <Deposits
          amount={accountDeposits?.[0]?.total_amount ?? 0}
          month={selectedMonth}
        />
      </div>

      <div className="mt-8"></div>
    </div>
  );
}
