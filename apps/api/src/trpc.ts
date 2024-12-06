import { initTRPC } from "@trpc/server";
import type { Context } from "./createContext";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const authProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new Error("Unauthorized");
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
