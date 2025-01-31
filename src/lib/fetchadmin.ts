import { client } from "@/lib/turso";

// Admin data
export async function fetchAllExpenses() {
  const query = `
      SELECT
        h.address AS house,
        e.date,
        e.concept,
        e.category,
        e.payment_method,
        e.amount,
        e.description
      FROM
        expenses e
      JOIN
        houses h ON e.house_id = h.house_id
    `;
  const result = await client.execute(query);
  return result.rows;
}

export async function fetchAllIncomes() {
  const query = `
      SELECT
        h.address AS house,
        i.date,
        i.payment_method,
        i.amount,
        i.description
      FROM
        incomes i
      JOIN
        houses h ON i.house_id = h.house_id
    `;
  const result = await client.execute(query);
  return result.rows;
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
  return result.rows;
}
