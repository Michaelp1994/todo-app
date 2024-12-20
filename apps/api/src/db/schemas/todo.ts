import type { InferSelectModel } from "drizzle-orm";
import {
  text,
  serial,
  pgTable,
  integer,
  boolean,
  timestamp,
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
  listId: integer().references(() => listTable.id),
  order: integer().notNull(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  archivedAt: timestamp(),
});

export type Todo = InferSelectModel<typeof todoTable>;
