import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import auth from "./routers/auth.router";
import { createCallerFactory, publicProcedure, router } from "./trpc";

export const appRouter = router({
  auth,
  ping: publicProcedure.query(() => {
    console.log("Server pinged");
    return new Date().toISOString();
  }),
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;

export type RouterInput = inferRouterInputs<AppRouter>;
