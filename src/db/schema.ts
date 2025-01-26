import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

// Balances Table
export const balances = sqliteTable("balances", {
  balanceId: integer("balance_id").primaryKey().autoincrement(),
  houseId: integer("house_id").notNull(),
  balance: real("balance").notNull(),
});

// Expenses Table
export const expenses = sqliteTable("expenses", {
  expenseId: integer("expense_id").primaryKey().autoincrement(),
  houseId: integer("house_id"),
  amount: real("amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  category: text("category").notNull(),
  concept: text("concept").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
});

// Homeowners Table
export const homeowners = sqliteTable("homeowners", {
  homeownerId: integer("homeowner_id").primaryKey().autoincrement(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
});

// Houses Table
export const houses = sqliteTable("houses", {
  houseId: integer("house_id").primaryKey().autoincrement(),
  address: text("address").notNull(),
  homeownerId: integer("homeowner_id").notNull(),
});

// Incomes Table
export const incomes = sqliteTable("incomes", {
  incomeId: integer("income_id").primaryKey().autoincrement(),
  houseId: integer("house_id").notNull(),
  amount: real("amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
});

// Users Table
export const users = sqliteTable("users", {
  userId: integer("user_id").primaryKey().autoincrement(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"),
  password: text("password").notNull(),
});
