import { createTRPCRouter } from "./trpc";
import { siYuanRouter } from "./router/siyuan";
import { memoRouter } from "./router/memo";
import { didaRouter } from "./router/dida";

export const appRouter = createTRPCRouter({
  siyuan: siYuanRouter,
  memo: memoRouter,
  dida: didaRouter,
});

export type AppRouter = typeof appRouter;
