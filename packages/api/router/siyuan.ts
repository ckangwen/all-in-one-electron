import { createTRPCRouter, procedure } from "../trpc";
import { db, schema } from "@revealing/db";

export const siYuanRouter = createTRPCRouter({
  randomBookmark: procedure.query(() => {
    return db.select().from(schema.memo).limit(1);
  }),
});
