import React from "react";
import { fetchUserBalances, fetchUserExpenseCategories } from "@/lib/fetchuser";
import { AccountBalanceCard } from "./account-balance-card";
import { getSession } from "@/lib/session";
import { PieComponent } from "../pie-chart";

export async function UserBalanceContent() {
  const session = await getSession();
  if (
    !session ||
    session.role !== "user" ||
    typeof session.houseId !== "number"
  ) {
    throw new Error("User session or houseId is missing.");
  }

  const balances = await fetchUserBalances(session.houseId);
  const plainBalances = JSON.parse(JSON.stringify(balances));
  const { balance } = plainBalances[0];

  const monthlyExpenses = await fetchUserExpenseCategories(session.houseId);
  const plainMonthlyExpense = JSON.parse(JSON.stringify(monthlyExpenses));

  return (
    <div>
      <AccountBalanceCard balance={balance} />
      <PieComponent monthlyExpenses={plainMonthlyExpense} />
    </div>
  );
}
