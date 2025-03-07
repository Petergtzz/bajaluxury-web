"use server";

import { client } from "@/lib/turso";
import { Expense, Income, Balance } from "@/types";

export async function fetchAllExpenses(): Promise<Expense[]> {
  const query = `
    SELECT
      e.expense_id AS id,
      h.address AS house,
      e.date,
      e.concept,
      e.category,
      e.payment_method AS method,
      e.amount,
      e.description
    FROM
      expenses e
    JOIN
      houses h ON e.house_id = h.house_id
    ORDER BY
      id DESC
    `;
  const result = await client.execute(query);
  return result.rows.map((row) => ({
    id: row.id as number,
    house: row.house as string,
    date: row.date as string,
    category: row.category as string,
    concept: row.concept as string,
    method: row.method as string,
    amount: Number(row.amount),
    description: row.description as string,
  }));
}

export async function fetchAllIncomes(): Promise<Income[]> {
  const query = `
    SELECT
      i.income_id AS id,
      h.address AS house,
      i.date,
      i.payment_method AS method,
      i.amount,
      i.description
    FROM
      incomes i
    JOIN
      houses h ON i.house_id = h.house_id
    ORDER BY
      id DESC
    `;
  const result = await client.execute(query);
  return result.rows.map((row) => ({
    id: row.id as number,
    house: row.house as string,
    date: row.date as string,
    method: row.method as string,
    amount: Number(row.amount),
    description: row.description as string,
  }));
}

export async function fetchAllBalances() {
  const query = `
    SELECT
      h.address AS house,
      b.balance
    FROM
      balances b
    JOIN
      houses h ON b.house_id = h.house_id
    `;
  const result = await client.execute(query);
  return result.rows.map((row) => ({
    house: row.house as string,
    balance: Number(row.balance),
  }));
}

export async function fetchBalance(houseId: number) {
  const query = `
    SELECT
      h.address AS house,
      b.balance
    FROM
      balances b
    JOIN
      houses h ON b.house_id = h.house_id
    WHERE
      h.house_id = ?
    `;
  const result = await client.execute({ sql: query, args: [houseId] });
  return result.rows.map((row) => ({
    house: row.house as string,
    balance: Number(row.balance),
  }));
}

export async function fetchIncomeStatementExpenses(
  house_id: number,
  month: string,
) {
  const query = `
    SELECT
      e.expense_id AS id,
      h.address AS house,
      e.date,
      e.concept,
      e.category,
      e.payment_method AS method,
      e.description,
      SUM(e.amount) AS total_amount
    FROM
      expenses e
    JOIN
      houses h on e.house_id = h.house_id
    WHERE
      h.house_id = ?
      AND strftime('%Y-%m', e.date) = ?
    GROUP BY
      e.category,
      e.concept
    `;
  const result = await client.execute({
    sql: query,
    args: [house_id, month],
  });
  return result.rows.map((row) => ({
    id: row.id as number,
    house: row.house as string,
    date: row.date as string,
    category: row.category as string,
    concept: row.concept as string,
    method: row.method as string,
    description: row.description as string,
    total_amount: Number(row.total_amount),
  }));
}

export async function fetchIncomeStatementIncomes(
  address: string,
  month: string,
) {
  const query = `
    SELECT
      i.income_id AS id,
      h.address AS house,
      i.amount,
      i.date,
      i.payment_method AS method,
      i.description
    FROM
      incomes i
    JOIN
      houses h on i.house_id = h.house_id
    WHERE
      h.address = ?
      AND strftime('%Y-%m', i.date) = ?
    `;
  const result = await client.execute({
    sql: query,
    args: [address, month],
  });
  return result.rows.map((row) => ({
    id: row.id as number,
    house: row.house as string,
    amount: Number(row.amount),
    date: row.date as string,
    method: row.method as string,
    description: row.description as string,
  }));
}

export async function fetchTotalCashAmount(
  house_id: number,
  month: string,
  method: string,
) {
  const query = `
    SELECT
      h.address AS house,
      SUM(e.amount) AS total_amount
    FROM
      expenses e
    JOIN
      houses h ON e.house_id = h.house_id
    WHERE
      h.house_id = ?
      AND strftime('%Y-%m', e.date) = ?
      AND e.payment_method = ?
    `;

  const result = await client.execute({
    sql: query,
    args: [house_id, month, method],
  });
  return result.rows.map((row) => ({
    house: row.house as string,
    total_amount: Number(row.total_amount),
  }));
}

export async function fetchAddress() {
  const query = `
    SELECT
      house_id AS id,
      address
    FROM
      houses
    `;
  const result = await client.execute(query);
  return result.rows.map((row) => ({
    id: row.id as number,
    address: row.address as string,
  }));
}

export async function fetchAreaChart(
  houseId: number,
  month: string,
  method: string,
) {
  const query = `
    SELECT
      e.date,
      e.category,
      e.amount,
      SUM(e.amount) OVER (
        PARTITION BY e.category
        ORDER BY e.date
      ) AS cumulative_amount_by_category,
      SUM(e.amount) OVER (
        ORDER BY e.date
      ) AS cumulative_amount_total
    FROM
      expenses e
    WHERE
      e.house_id = ?
      AND strftime('%Y-%m', e.date) = ?
      AND e.payment_method = ?
    ORDER BY
      e.date ASC;
    `;
  const result = await client.execute({
    sql: query,
    args: [houseId, month, method],
  });
  return result.rows.map((row) => ({
    date: row.date as string,
    category: row.category as string,
    amount: Number(row.amount),
    cumulative_amount_by_category: Number(row.cumulative_amount_by_category),
    cumulative_amount_total: Number(row.cumulative_amount_total),
  }));
}

export async function fetchTotalSpendAmount(
  houseId: number,
  month: string,
  method: string,
) {
  const query = `
    SELECT
      h.address AS house,
      SUM(e.amount) AS total_amount
    FROM
      expenses e
    JOIN
      houses h ON e.house_id = h.house_id
    WHERE
      e.house_id = ?
      AND strftime('%Y-%m', e.date) = ?
      AND e.payment_method = ?
    `;
  const result = await client.execute({
    sql: query,
    args: [houseId, month, method],
  });
  return result.rows.map((row) => ({
    house: row.house as string,
    total_amount: Number(row.total_amount),
  }));
}
