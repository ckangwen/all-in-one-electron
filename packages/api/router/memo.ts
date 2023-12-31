import * as z from "zod";
import { createTRPCRouter, procedure } from "../trpc";
import { db, schema, eq } from "@revealing/db";
import { createInsertSchema } from "drizzle-zod";

const createMemoParams = createInsertSchema(schema.memo);

export const memoRouter = createTRPCRouter({
  list: procedure.query(() => {
    return db.select().from(schema.memo);
  }),
  findById: procedure.input(z.number()).query(({ input }) => {
    return db
      .select()
      .from(schema.memo)
      .where(eq(schema.memo.id, input))
      .limit(1)
      .then((res) => res[0]);
  }),
  create: procedure.input(createMemoParams).mutation(({ input }) => {
    return db.insert(schema.memo).values(input);
  }),

  delete: procedure.input(z.number()).mutation(({ input }) => {
    return db.delete(schema.memo).where(eq(schema.memo.id, input));
  }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        data: createMemoParams,
      })
    )
    .mutation(({ input }) => {
      return db
        .update(schema.memo)
        .set(input.data)
        .where(eq(schema.memo.id, input.id));
    }),
});
