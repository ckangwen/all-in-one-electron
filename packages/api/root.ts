import { createTRPCRouter } from "./trpc";
import { siYuanRouter } from "./router/siyuan";
import { memoRouter } from "./router/memo";

export const appRouter = createTRPCRouter({
  siYuan: siYuanRouter,
  memo: memoRouter,
});

export type AppRouter = typeof appRouter;
