import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core"

export const memo = mysqlTable("memo", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }),
  type: varchar("type", { length: 20 }),
  raw: varchar("raw", { length: 255 }),
  content: varchar("content", { length: 255 }),
});
