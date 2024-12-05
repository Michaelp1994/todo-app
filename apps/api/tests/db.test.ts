import { expect, test } from "vitest";
import { db } from "../src/db";
import { users } from "../src/db/schemas/user";

test("Can connect to the db", async () => {
  const allUsers = await db.select().from(users).execute();
  expect(allUsers).toEqual([]);
});
