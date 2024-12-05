import { expect, test } from "vitest";
import { createCaller } from "../src/router";

test("User can login", async () => {
  const caller = createCaller({});
  const result = await caller.auth.login({
    email: "test@example.com",
    password: "password",
  });

  expect(result).toBe(true);
});
