import { eq } from "drizzle-orm";
import { authProcedure, publicProcedure, router } from "../trpc";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { userTable } from "../db/schemas/user";
import { hashPassword, verifyPasswordHash } from "../auth/passwords";
import {
  createSession,
  generateSessionToken,
  invalidateSession,
} from "../auth/sessions";

export default router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(userTable)
      .where(eq(userTable.email, input.email))
      .execute();

    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await verifyPasswordHash(user.password, input.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    ctx.setSessionCookie(token, session.expiresAt);
    return true;
  }),
  validate: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  logout: authProcedure.mutation(async ({ ctx }) => {
    await invalidateSession(ctx.session.id);
    ctx.deleteSessionCookie();
    return true;
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const [user] = await ctx.db
        .insert(userTable)
        .values({
          email: input.email,
          password: await hashPassword(input.password),
        })
        .returning()
        .execute();

      if (!user) {
        throw new Error("Failed to register user");
      }
      const token = generateSessionToken();
      const session = await createSession(token, user.id);
      ctx.setSessionCookie(token, session.expiresAt);
      return true;
    }),
});
