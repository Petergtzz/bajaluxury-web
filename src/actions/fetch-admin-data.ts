"use server";

import { transformRawResult } from "@/components/hot-table/sqlite/sql-helper";
import { client } from "@/lib/turso";
import { Expense, Income, Balance } from "@/types";
import { DatabaseResultSet } from "@/types/query-types";

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

export async function fetchAllBalances(): Promise<Balance[]> {
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

export async function fetchAllStaements() {
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
    WHERE
      S
    `;
}

export async function query(
  tableName: string,
  date?: string,
  order?: string,
): Promise<DatabaseResultSet> {
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
      ${tableName} e
    JOIN
      houses h ON e.house_id = h.house_id
    WHERE
      strftime('%Y-%m', e.date) = '${date}'
    `;
  const result = await client.execute(query);
  return transformRawResult(result);
}
