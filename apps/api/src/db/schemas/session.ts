import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

import { userTable } from "./user";

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
