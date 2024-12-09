import { db } from "@todo/api/db";
import { todoTable } from "@todo/api/schemas/todo";

export default async function cleanDatabase() {
  await db.delete(todoTable);
}
