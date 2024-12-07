import { expect, test } from "vitest";
import { createCaller } from "../src/router";
import createContext from "../src/createContext";

test("Can ping the api", async () => {
  const caller = createCaller(
    await createContext({ headers: new Headers(), db: {} })
  );
  const result = await caller.ping();
  expect(result).toBeTypeOf("string");
});
