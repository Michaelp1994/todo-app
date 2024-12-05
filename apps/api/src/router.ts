import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    console.log("Hello World in server");
    return "Hello World!";
  }),
});

export type AppRouter = typeof appRouter;
