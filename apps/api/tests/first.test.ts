import { expect, test } from "vitest";
import { createCaller } from "../src/router";

test("Can call the router", async () => {
  const caller = createCaller({});
  const result = await caller.hello();

  expect(result).toBe("Hello World!");
});
