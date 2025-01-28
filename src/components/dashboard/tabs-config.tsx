import React from "react"; // Import React
import { ExpensesContent } from "./expenses-content";
import { IncomesContent } from "./incomes-content";
import { BalancesContent } from "./balances-content";

type Tab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

type TabsConfig = Record<string, Tab[]>;

export const TABS_CONFIG: TabsConfig = {
  user: [
    { value: "expenses", label: "Expenses", content: <ExpensesContent /> },
    { value: "incomes", label: "Incomes", content: <IncomesContent /> },
  ],
  admin: [
    { value: "expenses", label: "Expenses", content: <ExpensesContent /> },
    { value: "incomes", label: "Incomes", content: <IncomesContent /> },
    { value: "balances", label: "Balances", content: <BalancesContent /> },
  ],
};
