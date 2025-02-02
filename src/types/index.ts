export interface AdminBalances {
  house: number;
  balance: number;
}

export interface AdminExpenses {
  house: number;
  date: string;
  category: string;
  concept: string;
  method: string;
  amount: number;
  description: string;
}

export interface AdminIncomes {
  house: number;
  date: string;
  method: string;
  amount: number;
  description: string;
}

export interface UserBalance {
  house: string;
  balance: number;
}

export interface UserExpense {
  house: string;
  date: string;
  category: string;
  concept: string;
  method: string;
  amount: number;
  description: string;
}

export interface UserIncome {
  house: string;
  date: string;
  method: string;
  amount: number;
  description: string;
}
