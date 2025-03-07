"use server";

import { Balance, Income, Expense } from "@/types";
import { client } from "@/lib/turso";

export async function fetchUserExpenses(houseId: number) {
  const query = `
    SELECT
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
    WHERE
      e.house_id = ?
    ORDER BY
      e.date DESC;
    `;
  const result = await client.execute({
    sql: query,
    args: [houseId],
  });

  return result.rows.map((row) => ({
    house: row.house as string,
    date: row.date as string,
    category: row.category as string,
    concept: row.concept as string,
    method: row.method as string,
    amount: Number(row.amount),
    description: row.description as string,
  }));
}

export async function fetchUserIncomes(houseId: number) {
  if (!houseId) {
    throw new Error("houseId is required to fetch expenses.");
  }

  const query = `
    SELECT
      h.address AS house,
      i.date,
      i.payment_method AS method,
      i.amount,
      i.description
    FROM
      incomes i
    JOIN
      houses h ON i.house_id = h.house_id
    WHERE
      i.house_id = ?
    ORDER BY
      i.date DESC;
    `;
  const result = await client.execute({ sql: query, args: [houseId] });
  return result.rows.map((row) => ({
    house: row.house as string,
    date: row.date as string,
    method: row.method as string,
    amount: Number(row.amount),
    description: row.description as string,
  }));
}

export async function fetchBalance(houseId: number): Promise<Balance[]> {
  if (!houseId) {
    throw new Error("houseId is required to fetch expenses.");
  }

  const query = `
    SELECT
      h.address AS house,
      b.balance
    FROM
      balances b
    JOIN
      houses h ON b.house_id = h.house_id
    WHERE
      b.house_id = ?;
    `;
  const result = await client.execute({ sql: query, args: [houseId] });
  return result.rows.map((row) => ({
    house: row.house as string,
    balance: Number(row.balance),
  }));
}

export async function fetchPieData(houseId: number, month: string) {
  if (!houseId) {
    throw new Error("houseId is required to fetch expenses.");
  }

  const query = `
    SELECT
      e.category,
      SUM(e.amount) AS total_amount
    FROM
      expenses e
    WHERE
      e.house_id = ?
      AND strftime('%Y-%m', e.date) = ?
    GROUP BY
      e.category
    ORDER BY
      total_amount DESC;
    `;
  const result = await client.execute({
    sql: query,
    args: [houseId, month],
  });

  return result.rows.map((row) => ({
    category: row.category as string,
    total_amount: Number(row.total_amount),
  }));
}

export async function fetchIncomeStatementData(houseId: number, month: string) {
  if (!houseId) {
    throw new Error("houseId is required to fetch expenses.");
  }

  const query = `
    SELECT
      e.category,
      e.concept,
      e.payment_method AS method,
      e.date,
      e.description,
      SUM(e.amount) AS total_amount
    FROM
      expenses e
    WHERE
      e.house_id = ?
      AND strftime('%Y-%m', e.date) = ?
    GROUP BY
      e.category,
      e.concept
    ORDER BY
      total_amount DESC;
    `;
  const result = await client.execute({
    sql: query,
    args: [houseId, month],
  });
  return result.rows.map((row) => ({
    category: row.category as string,
    concept: row.concept as string,
    method: row.method as string,
    date: row.date as string,
    description: row.description as string,
    total_amount: Number(row.total_amount),
  }));
}
