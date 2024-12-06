import { eq } from "drizzle-orm";
import { publicProcedure, router } from "../trpc";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { users } from "../db/schemas/user";
import { hashPassword, verifyPasswordHash } from "../auth/passwords";

export default router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    console.log(`Logging in user with email: ${input.email}`);
    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.email, input.email))
      .execute();

    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await verifyPasswordHash(user.password, input.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    console.log(`User with email ${input.email} logged in`);
    return true;
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const [user] = await ctx.db
        .insert(users)
        .values({
          email: input.email,
          password: await hashPassword(input.password),
        })
        .returning()
        .execute();

      if (!user) {
        throw new Error("Failed to register user");
      }
      console.log(`Registered user with email: ${input.email}`);

      return true;
    }),
});
