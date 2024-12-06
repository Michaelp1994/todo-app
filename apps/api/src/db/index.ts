import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import { users } from "./schemas/user";

const pool = new Pool({
  host: Resource.database.host,
  port: Resource.database.port,
  user: Resource.database.username,
  password: Resource.database.password,
  database: Resource.database.database,
});

export const db = drizzle(pool, { schema: { users } });
