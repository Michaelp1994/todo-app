import { text, serial, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
});
