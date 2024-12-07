import { z } from "zod";

export const listId = z.number().int();

export const getAllSchema = z.object({});

export const getByIdSchema = z.object({
  id: listId,
});

export const createSchema = z.object({
  title: z.string(),
});

export const updateSchema = createSchema.extend({
  id: listId,
});

export const archiveSchema = z.object({
  id: listId,
});

export const deleteSchema = z.object({
  id: listId,
});
