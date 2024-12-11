import { z } from "zod";

export const todoId = z.number().int();

export const getAllSchema = z.object({
  archived: z.boolean().optional(),
  important: z.boolean().optional(),
});

export const getWeekSchema = z.object({});

export const getAllByListSlugSchema = z.object({
  slug: z.string().uuid(),
});

export const getByIdSchema = z.object({
  id: todoId,
});

export const createSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
  important: z.boolean(),
  dueDate: z.string().date().nullable(),
  attachmentUrl: z.string(),
  listId: z.number().nullable(),
});

export const updateSchema = createSchema.partial().extend({
  id: todoId,
});

export const archiveSchema = z.object({
  id: todoId,
});

export const deleteSchema = z.object({
  id: todoId,
});

export const deleteAllArchivedSchema = z.object({});
