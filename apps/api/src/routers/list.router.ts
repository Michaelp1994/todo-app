import { TRPCError } from "@trpc/server";
import { authProcedure, router } from "../trpc";
import {
  archiveSchema,
  createSchema,
  deleteSchema,
  getAllSchema,
  getByIdSchema,
  updateSchema,
} from "../validators/list.schema";

export default router({
  getAll: authProcedure.input(getAllSchema).query(async () => {
    return new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  getById: authProcedure.input(getByIdSchema).query(async () => {
    return new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  create: authProcedure.input(createSchema).query(async () => {
    return new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  update: authProcedure.input(updateSchema).query(async () => {
    return new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  archive: authProcedure.input(archiveSchema).query(async () => {
    return new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
  delete: authProcedure.input(deleteSchema).query(async () => {
    return new TRPCError({
      code: "NOT_IMPLEMENTED",
    });
  }),
});
