import { authProcedure, router } from "../trpc";
import {
  archiveSchema,
  createSchema,
  deleteSchema,
  getAllSchema,
  getByIdSchema,
  getBySlugSchema,
  updateSchema,
} from "../validators/list.schema";
import { listTable } from "../db/schemas/list";
import { and, eq } from "drizzle-orm";

export default router({
  getAll: authProcedure.input(getAllSchema).query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(listTable)
      .where(eq(listTable.userId, ctx.user.id))
      .execute();
  }),
  getById: authProcedure.input(getByIdSchema).query(async ({ ctx, input }) => {
    const [list] = await ctx.db
      .select()
      .from(listTable)
      .where(and(eq(listTable.userId, ctx.user.id), eq(listTable.id, input.id)))
      .execute();
    return list;
  }),
  getBySlug: authProcedure
    .input(getBySlugSchema)
    .query(async ({ ctx, input }) => {
      const [list] = await ctx.db
        .select()
        .from(listTable)
        .where(
          and(eq(listTable.userId, ctx.user.id), eq(listTable.slug, input.slug))
        )
        .execute();
      return list;
    }),
  create: authProcedure.input(createSchema).mutation(async ({ ctx, input }) => {
    const [newList] = await ctx.db
      .insert(listTable)
      .values({ ...input, userId: ctx.user.id })
      .returning()
      .execute();
    return newList;
  }),
  update: authProcedure.input(updateSchema).mutation(async ({ ctx, input }) => {
    const { id, ...values } = input;
    const [updatedList] = await ctx.db
      .update(listTable)
      .set({ ...values })
      .where(and(eq(listTable.id, id), eq(listTable.userId, ctx.user.id)))
      .returning()
      .execute();
    return updatedList;
  }),
  archive: authProcedure
    .input(archiveSchema)
    .mutation(async ({ ctx, input }) => {
      const [archivedList] = await ctx.db
        .update(listTable)
        .set({ archivedAt: new Date() })
        .where(
          and(eq(listTable.id, input.id), eq(listTable.userId, ctx.user.id))
        )
        .returning()
        .execute();
      return archivedList;
    }),
  delete: authProcedure.input(deleteSchema).mutation(async ({ ctx, input }) => {
    const [deletedList] = await ctx.db
      .delete(listTable)
      .where(and(eq(listTable.id, input.id), eq(listTable.userId, ctx.user.id)))
      .returning()
      .execute();
    return deletedList;
  }),
});
