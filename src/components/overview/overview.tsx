"use client";
import { fetchAccountBalance } from "@/actions/fetch-turso-data";
import AddressSelector from "@/components/address-selector";
import MonthSelector from "@/components/month-selector";
import { AccountBalance } from "@/components/overview/utils/account-balance";
import IncomeStatement from "@/components/statement";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AlertDestructive } from "../error-message";
import Loading from "../loading-component";
import { useClientSession } from "../session-client-provider";
import { PieComponent } from "./utils/pie-chart";

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
    queryFn: () => fetchAccountBalance(houseId ?? -1),
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
    <div>
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-6">
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

      <div className="w-full my-5 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 flex flex-col">
          <IncomeStatement house_id={houseId} month={selectedMonth} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-1/2">
              <AccountBalance
                balance={accountBalance?.[0]?.balance ?? 0}
                currency="MXN"
              />
            </div>
            <div className="w-full md:w-1/2">
              <AccountBalance
                balance={accountBalance?.[0]?.balance ?? 0}
                currency="USD"
              />
            </div>
          </div>
          <div className="w-full">
            <PieComponent house_id={houseId} month={selectedMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}
