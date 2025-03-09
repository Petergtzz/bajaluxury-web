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

// Used to fetch expenses for income statement
export async function fetchIncomeStatementData(
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

// Used to fetch address data for address selector
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

// Used to fetch pie data
export async function fetchPieData(houseId: number, month: string) {
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

// Used to fetch user expenses
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

// Used to fetch user incomes
export async function fetchUserIncomes(houseId: number) {
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

// Used to fetch bar data

// Used to fetch line data
