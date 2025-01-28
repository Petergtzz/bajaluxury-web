import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@libsql/client";

// console.log("Database URL:", process.env.TURSO_DATABASE_URL);
// console.log("Database URL:", process.env.TURSO_AUTH_TOKEN);

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});
