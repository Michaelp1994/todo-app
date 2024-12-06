import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

import { userTable } from "./user";
import type { InferSelectModel } from "drizzle-orm";

export const sessionTable = pgTable("session", {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp({
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = InferSelectModel<typeof sessionTable>;
