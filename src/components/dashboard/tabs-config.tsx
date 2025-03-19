import React from "react";
import AdminStatements from "./admin/admin-statements";
import AdminBalances from "./admin/admin-balances";
import AdminExpenses from "./admin/admin-expenses";
import AdminIncomes from "./admin/admin-incomes";
import UserBalanceContent from "./user/user-balance";
import UserExpensesContent from "./user/user-expenses";
import UserIncomesContent from "./user/user-incomes";

type Tab = {
  value: string;
  label: string;
  content: () => React.ReactNode;
};

type TabsConfig = Record<string, Tab[]>;

export const TABS_CONFIG: TabsConfig = {
  user: [
    {
      value: "income statement",
      label: "Income Statement",
      content: () => <UserBalanceContent />,
    },
    {
      value: "expenses",
      label: "Expenses",
      content: () => <UserExpensesContent />,
    },
    {
      value: "deposits",
      label: "Deposits",
      content: () => <UserIncomesContent />,
    },
  ],
  admin: [
    {
      value: "statement",
      label: "Statement",
      content: () => <AdminStatements />,
    },
    {
      value: "balances",
      label: "Balances",
      content: () => <AdminBalances />,
    },
    { value: "expenses", label: "Expenses", content: () => <AdminExpenses /> },
    { value: "deposits", label: "Deposits", content: () => <AdminIncomes /> },
  ],
};
