import * as z from "zod";
import { schema } from "@revealing/db";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

const findMemoSchema = createSelectSchema(schema.memo);
const createMemoSchema = createInsertSchema(schema.memo);

export type CreatetMemoType = z.infer<typeof createMemoSchema>;
export type FindMemoType = z.infer<typeof findMemoSchema>;
