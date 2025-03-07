"use client";
import { fetchBalance } from "@/actions/fetch-admin-data";
import MonthSelector from "@/components/month-selector";
import { AccountBalance } from "@/components/overview/components/account-balance";
import AddressSelector from "@/components/overview/components/address-selector";
import IncomeStatement from "@/components/statement";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AlertDestructive } from "../error-message";
import Loading from "../loading-component";
import { useClientSession } from "../session-client-provider";

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
    error,
    isError,
    isPending,
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
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

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
