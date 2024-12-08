import type { InferSelectModel } from "drizzle-orm";
import { text, serial, pgTable, integer } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const listTable = pgTable("list", {
  id: serial().primaryKey(),
  title: text().notNull(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
});

export type List = InferSelectModel<typeof listTable>;
