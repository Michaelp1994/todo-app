import { expect, it } from "vitest";
import {
  getSessionTokenFromHeaders,
  setSessionTokenCookie,
  deleteSessionTokenCookie,
} from "./cookies";
import { generateSessionToken } from "./sessions";

it("should read the correct session cookie from request headers", async () => {
  const headers = new Headers();
  const token = generateSessionToken();
  headers.append("cookie", `session=${token}`);
  const readToken = getSessionTokenFromHeaders(headers);
  expect(readToken).toBe(token);
});

it("should set the correct session variable cookie in response headers", async () => {
  const resHeaders = new Headers();
  const token = generateSessionToken();
  setSessionTokenCookie(resHeaders, token, new Date());
  expect(resHeaders.get("Set-Cookie")).toContain(`session=${token};`);
});

it("should set the session variable to blank in response headers", async () => {
  const resHeaders = new Headers();
  deleteSessionTokenCookie(resHeaders);
  expect(resHeaders.get("Set-Cookie")).toContain(`session=;`);
});
