import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";
export default defineConfig({
  out: "./drizzle",
  schema: "./apps/api/src/db/schemas/*.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    host: Resource.database.host,
    port: Resource.database.port,
    user: Resource.database.username,
    password: Resource.database.password,
    database: Resource.database.database,
    ssl: false,
  },
});
