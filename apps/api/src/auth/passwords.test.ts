import { expect, test } from "vitest";
import { hashPassword, verifyPasswordHash } from "./passwords";

test("can hash password and verify", async () => {
  const password = "Test Password";
  const hash = await hashPassword(password);
  const isValid = await verifyPasswordHash(hash, password);
  expect(isValid).toBe(true);
});

test("incorrect password is caught", async () => {
  const password = "Test Password";
  const incorrectPassword = "another password";
  const hash = await hashPassword(password);
  const isValid = await verifyPasswordHash(hash, incorrectPassword);
  expect(isValid).toBe(false);
});

test("case sensitivity", async () => {
  const password = "Test Password";
  const incorrectPassword = password.toLowerCase();
  const hash = await hashPassword(password);
  const isValid = await verifyPasswordHash(hash, incorrectPassword);
  expect(isValid).toBe(false);
});
