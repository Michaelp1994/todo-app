import auth from "./routers/auth.router";
import { createCallerFactory, publicProcedure, router } from "./trpc";

export const appRouter = router({
  auth,
  hello: publicProcedure.query(() => {
    console.log("Hello World in server");
    return "Hello World!";
  }),
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
