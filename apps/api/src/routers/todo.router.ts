import { TRPCError } from "@trpc/server";
import { authProcedure, router } from "../trpc";
import {
  archiveSchema,
  createSchema,
  deleteSchema,
  getAllSchema,
  getByIdSchema,
  updateSchema,
} from "../validators/todo.schema";
import { todoTable } from "../db/schemas/todo";
import { and, eq, isNull } from "drizzle-orm";

export default router({
  getAll: authProcedure.input(getAllSchema).query(async ({ ctx }) => {
    const todos = await ctx.db
      .select()
      .from(todoTable)
      .where(
        and(eq(todoTable.userId, ctx.user.id), isNull(todoTable.archivedAt))
      )
      .orderBy(todoTable.createdAt);
    return todos;
  }),
  getById: authProcedure.input(getByIdSchema).query(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  create: authProcedure.input(createSchema).mutation(async ({ ctx, input }) => {
    const [newTodo] = await ctx.db
      .insert(todoTable)
      .values({ ...input, userId: ctx.user.id })
      .returning()
      .execute();
    return newTodo;
  }),
  update: authProcedure.input(updateSchema).mutation(async ({ ctx, input }) => {
    const { id, ...values } = input;
    const [updatedTodo] = await ctx.db
      .update(todoTable)
      .set(values)
      .where(and(eq(todoTable.id, id), eq(todoTable.userId, ctx.user.id)))
      .returning()
      .execute();
    return updatedTodo;
  }),
  archive: authProcedure
    .input(archiveSchema)
    .mutation(async ({ ctx, input }) => {
      const archivedTodo = await ctx.db
        .update(todoTable)
        .set({ archivedAt: new Date() })
        .where(
          and(eq(todoTable.id, input.id), eq(todoTable.userId, ctx.user.id))
        )
        .returning()
        .execute();
      return [archivedTodo];
    }),
  delete: authProcedure.input(deleteSchema).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
});
