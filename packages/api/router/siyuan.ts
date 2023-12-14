import { createTRPCRouter, procedure } from "../trpc";

export const siYuanRouter = createTRPCRouter({
  randomBookmark: procedure.query(() => {
    return {
      hello: "world",
    }
  }),
});