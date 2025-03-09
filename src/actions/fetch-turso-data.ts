"use server";
import { client } from "@/lib/turso";

// Used to fetch the balance of a house
export async function fetchAccountBalance(houseId: number) {
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

// Used to fetch all expenses of all houses
export async function fetchAllExpenses() {
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
