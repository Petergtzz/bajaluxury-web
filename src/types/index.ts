export interface Balance {
  house: string;
  balance: number;
}

export interface Expense {
  house: string;
  date: string;
  category: string;
  concept: string;
  method: string;
  amount: number;
  description: string;
}

export interface Income {
  house: string;
  date: string;
  method: string;
  amount: number;
  description: string;
}

export interface Tasks {
  task: number;
  house: string;
  concept: string;
  status: string;
  date: string;
}
