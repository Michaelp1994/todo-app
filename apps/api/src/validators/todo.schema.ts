import { z } from "zod";

export const todoId = z.number().int();

export const getAllSchema = z.object({});

export const getByIdSchema = z.object({
  id: todoId,
});

export const createSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  dueDate: z.date(),
  attachmentUrl: z.string(),
  listId: z.number(),
  order: z.number(),
});

export const updateSchema = createSchema.extend({
  id: todoId,
});

export const archiveSchema = z.object({
  id: todoId,
});

export const deleteSchema = z.object({
  id: todoId,
});