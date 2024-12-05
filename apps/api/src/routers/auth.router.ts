import { publicProcedure, router } from "../trpc";
import { loginSchema } from "../validators/auth.schema";

export default router({
  login: publicProcedure.input(loginSchema).mutation(({ input }) => {
    console.log(`Logging in user with email: ${input.email}`);
    return true;
  }),
});
