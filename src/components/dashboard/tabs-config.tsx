import React from "react";
import { ExpensesContent } from "./admin-expenses";
import { IncomesContent } from "./admin-incomes";
import { BalancesContent } from "./admin-balances";
import { UserExpensesContent } from "./user-expenses";
import { UserIncomesContent } from "./user-incomes";
import { UserBalanceContent } from "./user-balance";

type Tab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

type TabsConfig = Record<string, Tab[]>;

export const TABS_CONFIG: TabsConfig = {
  user: [
    { value: "balances", label: "Balance", content: <UserBalanceContent /> },
    { value: "expenses", label: "Expenses", content: <UserExpensesContent /> },
    { value: "incomes", label: "Incomes", content: <UserIncomesContent /> },
  ],
  admin: [
    { value: "balances", label: "Balances", content: <BalancesContent /> },
    { value: "expenses", label: "Expenses", content: <ExpensesContent /> },
    { value: "incomes", label: "Incomes", content: <IncomesContent /> },
  ],
};
