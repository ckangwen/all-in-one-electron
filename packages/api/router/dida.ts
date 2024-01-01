import * as z from "zod";
import { Dida } from "../libs/dida";
import { createTRPCRouter, procedure } from "../trpc";

const dida = new Dida({
  username: import.meta.env.VITE_DIDA_USERNAME,
  password: import.meta.env.VITE_DIDA_PASSWORD,
});

export const didaRouter = createTRPCRouter({
  login: procedure.query(() => {
    return dida.checkLogin();
  }),
  findDiary: procedure.query(() => {
    return dida.findDiary();
  }),
  findOrCreateDiary: procedure.query(() => {
    return dida.findDiary().then((data) => {
      if (data) {
        return data;
      }

      return dida.createDiary();
    });
  }),
  createDiary: procedure.mutation(() => {
    return dida.createDiary();
  }),
  updateDiary: procedure.input(z.string()).mutation(({ input }) => {
    return dida.updateDiary(input);
  }),
});
