import type { InferSelectModel } from "drizzle-orm";
import {
  text,
  serial,
  pgTable,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { listTable } from "./list";

export const todoTable = pgTable("todo", {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text(),
  completed: boolean().notNull().default(false),
  dueDate: date(),
  important: boolean().notNull().default(false),
  attachmentUrl: text(),
  listId: integer()
    .notNull()
    .references(() => listTable.id),
  order: integer().notNull(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
  createdAt: date().notNull().defaultNow(),
  archivedAt: date().notNull().defaultNow(),
});

export type Todo = InferSelectModel<typeof todoTable>;
