import { migrate } from "drizzle-orm/mysql2/migrator";
import config from "./drizzle.config";
import { db } from ".";

async function main() {
  await migrate(db, { migrationsFolder: config.out });
  console.log("migration done");
}

main();
