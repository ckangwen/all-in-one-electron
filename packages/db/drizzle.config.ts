import type { Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  out: "./migrations",
  driver: "mysql2",
  dbCredentials: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "revealing",
    password: "root",
  },
} satisfies Config;
