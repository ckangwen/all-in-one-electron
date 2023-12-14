import { siYuanRouter } from "./router/siyuan";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  siYuan: siYuanRouter,
});

export type AppRouter = typeof appRouter;
