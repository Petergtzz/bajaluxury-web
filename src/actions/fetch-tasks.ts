"use server";
import { client } from "@/lib/turso";

export async function fetchAdminTasks() {
  const query = `
    SELECT
      t.task_id AS task,
      h.address AS house,
      t.concept,
      t.status,
      t.date
    FROM
      tasks t
    JOIN
      houses h ON t.house_id = h.house_id
    ORDER BY
      t.date DESC;
    `;
  const result = await client.execute(query);
  return result.rows.map((row) => ({
    task: row.task as number,
    house: row.house as string,
    concept: row.concept as string,
    status: row.status as string,
    date: row.date as string,
  }));
}

export async function fetchUserTasks(houseId: number) {
  const query = `
    SELECT
      t.task_id AS task,
      h.address AS house,
      t.concept,
      t.status,
      t.date
    FROM
      tasks t
    JOIN
      houses h ON t.house_id = h.house_id
    WHERE
      t.house_id = ?
    ORDER BY
      t.date DESC;
    `;
  const result = await client.execute({
    sql: query,
    args: [houseId],
  });

  return result.rows.map((row) => ({
    task: row.task as number,
    house: row.house as string,
    concept: row.concept as string,
    status: row.status as string,
    date: row.date as string,
  }));
}
