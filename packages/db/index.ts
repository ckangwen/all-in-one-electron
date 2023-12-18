import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";
import { memo } from "./schema";
import config from "./drizzle.config";

export const schema = {
  memo,
};

const connection = createConnection(config.dbCredentials);

export const db = drizzle(connection);

export * from "drizzle-orm";
