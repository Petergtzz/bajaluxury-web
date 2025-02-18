import React from "react";
import { AdminExpenses } from "./admin/admin-expenses";
import { AdminIncomes } from "./admin/admin-incomes";
import { AdminBalances } from "./admin/admin-balances";
import { UserExpensesContent } from "./user/user-expenses";
import { UserIncomesContent } from "./user/user-incomes";
import UserBalanceContent from "./user/user-balance";

type Tab = {
  value: string;
  label: string;
  content: (houseId: number) => React.ReactNode;
};

type TabsConfig = Record<string, Tab[]>;

export const TABS_CONFIG: TabsConfig = {
  user: [
    {
      value: "balances",
      label: "Balance",
      content: (houseId) => <UserBalanceContent houseId={houseId} />,
    },
    {
      value: "expenses",
      label: "Expenses",
      content: (houseId) => <UserExpensesContent houseId={houseId} />,
    },
    {
      value: "incomes",
      label: "Incomes",
      content: (houseId) => <UserIncomesContent houseId={houseId} />,
    },
  ],
  admin: [
    {
      value: "balances",
      label: "Balances",
      content: () => <AdminBalances />,
    },
    { value: "expenses", label: "Expenses", content: () => <AdminExpenses /> },
    { value: "incomes", label: "Incomes", content: () => <AdminIncomes /> },
  ],
};
