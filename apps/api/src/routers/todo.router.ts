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

export default router({
  getAll: authProcedure.input(getAllSchema).query(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  getById: authProcedure.input(getByIdSchema).query(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  create: authProcedure.input(createSchema).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  update: authProcedure.input(updateSchema).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  archive: authProcedure.input(archiveSchema).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  delete: authProcedure.input(deleteSchema).mutation(async () => {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
});
