import { createClient } from "@libsql/client";
import dotenv from "dotenv";
dotenv.config();

// console.log("Database URL:", process.env.TURSO_DATABASE_URL);
// console.log("Database URL:", process.env.TURSO_AUTH_TOKEN);

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
