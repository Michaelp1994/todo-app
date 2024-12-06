import type { InferSelectModel } from "drizzle-orm";
import { text, serial, pgTable } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export type User = InferSelectModel<typeof userTable>;
