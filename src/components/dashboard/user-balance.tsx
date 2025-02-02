import React from "react";
import {
  fetchUserBalances,
  fetchUserCategories,
  fetchUserCategoriesAndConcepts,
} from "@/lib/fetchuser";
import { AccountBalanceCardMxn } from "./account-balance-card-mxn";
import { getSession } from "@/lib/session";
import { PieComponent } from "../pie-chart";
import { AccountBalanceCardUsd } from "./account-balance-card-usd";
import { IncomeStatement } from "./income-statement";

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
  // const plainBalances = JSON.parse(JSON.stringify(balances));
  // const { balance } = plainBalances[0];

  const categoryExpense = await fetchUserCategories(session.houseId);
  //const plainCategoryExpense = JSON.parse(JSON.stringify(categoryExpense));

  const categoryAndConceptExpense = await fetchUserCategoriesAndConcepts(
    session.houseId,
  );
  //const plainCategoryAndConceptExpense = JSON.parse(
  //  JSON.stringify(categoryAndConceptExpense),
  //);

  const balance = balances?.[0]?.balance ?? 0;

  return (
    <div className="relative w-full my-5 flex flex-col md:flex-row gap-4">
      {/* Income Statement - Takes Full Height */}
      <div className="w-full md:w-1/2 flex flex-col">
        <IncomeStatement monthlyExpenses={categoryAndConceptExpense} />
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
          <PieComponent monthlyExpenses={categoryExpense} />
        </div>
      </div>
    </div>
  );
}
