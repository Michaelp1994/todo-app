import type { InferSelectModel } from "drizzle-orm";
import {
  text,
  serial,
  pgTable,
  integer,
  timestamp,
  uuid,
  unique,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const listTable = pgTable(
  "list",
  {
    id: serial().primaryKey(),
    title: text().notNull(),
    slug: uuid().notNull().defaultRandom(),
    userId: integer()
      .notNull()
      .references(() => userTable.id),
    createdAt: timestamp().notNull().defaultNow(),
    archivedAt: timestamp(),
  },
  (t) => [unique().on(t.userId, t.title)]
);

export type List = InferSelectModel<typeof listTable>;
