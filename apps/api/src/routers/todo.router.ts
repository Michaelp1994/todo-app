import { authProcedure, router } from "../trpc";
import {
  archiveSchema,
  createSchema,
  deleteAllArchivedSchema,
  deleteSchema,
  getAllSchema,
  getByIdSchema,
  getWeekSchema,
  updateSchema,
} from "../validators/todo.schema";
import { todoTable } from "../db/schemas/todo";
import { and, between, eq, isNotNull, isNull } from "drizzle-orm";
import { addDays, format } from "date-fns";
import { groupTodosByDate } from "../utils/groupTodosByDueDate";

export default router({
  getAllToday: authProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const todos = await ctx.db
        .select()
        .from(todoTable)
        .where(
          and(
            eq(todoTable.userId, ctx.user.id),
            input.important ? eq(todoTable.important, true) : undefined,
            input.archived
              ? isNotNull(todoTable.archivedAt)
              : isNull(todoTable.archivedAt)
          )
        )
        .orderBy(todoTable.createdAt);
      return todos;
    }),
  getWeek: authProcedure.input(getWeekSchema).query(async ({ ctx }) => {
    const today = new Date();
    const fiveDays = addDays(today, 5);
    const todos = await ctx.db
      .select()
      .from(todoTable)
      .where(
        and(
          eq(todoTable.userId, ctx.user.id),
          isNull(todoTable.archivedAt),
          between(
            todoTable.dueDate,
            format(today, "yyyy-MM-dd"),
            format(fiveDays, "yyyy-MM-dd")
          )
        )
      )
      .orderBy(todoTable.createdAt);
    return groupTodosByDate(todos);
  }),
  getById: authProcedure.input(getByIdSchema).query(async ({ input, ctx }) => {
    const [todo] = await ctx.db
      .select()
      .from(todoTable)
      .where(and(eq(todoTable.userId, ctx.user.id), eq(todoTable.id, input.id)))
      .orderBy(todoTable.createdAt);
    return todo;
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
  unarchive: authProcedure
    .input(archiveSchema)
    .mutation(async ({ ctx, input }) => {
      const archivedTodo = await ctx.db
        .update(todoTable)
        .set({ archivedAt: null })
        .where(
          and(eq(todoTable.id, input.id), eq(todoTable.userId, ctx.user.id))
        )
        .returning()
        .execute();
      return [archivedTodo];
    }),
  delete: authProcedure.input(deleteSchema).mutation(async ({ ctx, input }) => {
    const deletedTodo = await ctx.db
      .delete(todoTable)
      .where(and(eq(todoTable.id, input.id), eq(todoTable.userId, ctx.user.id)))
      .returning()
      .execute();
    return [deletedTodo];
  }),
  deleteAllArchived: authProcedure
    .input(deleteAllArchivedSchema)
    .mutation(async ({ ctx }) => {
      const deletedTodo = await ctx.db
        .delete(todoTable)
        .where(
          and(
            isNotNull(todoTable.archivedAt),
            eq(todoTable.userId, ctx.user.id)
          )
        )
        .returning()
        .execute();
      return [deletedTodo];
    }),
});
