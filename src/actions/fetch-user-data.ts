"use server";

import { UserBalance } from "@/types";
import { client } from "@/lib/turso";

export async function fetchBalance(houseId: number): Promise<UserBalance[]> {
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
    total_amount: Number(row.total_amount),
  }));
}
