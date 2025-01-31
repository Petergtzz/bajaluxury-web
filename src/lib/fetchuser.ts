import { client } from "@/lib/turso";

export async function fetchUserExpenses(houseId: number) {
  if (!houseId) {
    throw new Error("houseId is required to fetch expenses.");
  }

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
        e.house_id = ?;
    `;
  const result = await client.execute({ sql: query, args: [houseId] });
  return result.rows;
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
        i.house_id = ?;
    `;
  const result = await client.execute({ sql: query, args: [houseId] });
  return result.rows;
}

export async function fetchUserBalances(houseId: number) {
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
  return result.rows;
}

export async function fetchUserCategories(houseId: number) {
  if (!houseId) {
    throw new Error("houseId is required to fetch expenses.");
  }

  const query = `
    SELECT
        e.category,
        SUM(e.amount) AS total_amount
    FROM expenses e
    WHERE
        e.house_id = ?
        AND strftime('%Y-%m', e.date) = strftime('%Y-%m', 'now')
    GROUP BY e.category
    ORDER BY total_amount DESC;
    `;
  const result = await client.execute({ sql: query, args: [houseId] });
  return result.rows;
}

export async function fetchUserCategoriesAndConcepts(houseId: number) {
  if (!houseId) {
    throw new Error("houseId is required to fetch expenses.");
  }

  const query = `
    SELECT
        e.category,
        e.concept,
        SUM(e.amount) AS total_amount
    FROM expenses e
    WHERE
        e.house_id = ?
        AND strftime('%Y-%m', e.date) = strftime('%Y-%m', 'now')
    GROUP BY e.category, e.concept
    ORDER BY e.category, total_amount DESC;
    `;
  const result = await client.execute({ sql: query, args: [houseId] });
  return result.rows;
}
