import { expect, test } from "vitest";
import { convertAWSHeaders } from "./convertAWSHeaders";

test("Convert AWS Headers to NodeJS standard library headers", async () => {
  const headers = convertAWSHeaders({
    cookie: "session=sessionToken",
    origin: "http://localhost:5173",
    "content-type": "application/json",
    "content-length": "0",
  });
  expect(headers.get("cookie")).toBe("session=sessionToken");
  expect(headers.get("origin")).toBe("http://localhost:5173");
  expect(headers.get("content-type")).toBe("application/json");
  expect(headers.get("content-length")).toBe("0");
  expect([...headers.keys()]).toHaveLength(4);
});
