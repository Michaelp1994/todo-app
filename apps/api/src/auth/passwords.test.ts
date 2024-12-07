import { expect, it } from "vitest";
import { hashPassword, verifyPasswordHash } from "./passwords";

it("should hash the password correctly and be verifiable", async () => {
  const password = "Test Password";
  const hash = await hashPassword(password);
  const isValid = await verifyPasswordHash(hash, password);
  expect(isValid).toBe(true);
});

it("should detect an incorrect password", async () => {
  const password = "Test Password";
  const incorrectPassword = "another password";
  const hash = await hashPassword(password);
  const isValid = await verifyPasswordHash(hash, incorrectPassword);
  expect(isValid).toBe(false);
});

it("should produce different hashes for the same password", async () => {
  const password = "Test Password";
  const hash1 = await hashPassword(password);
  const hash2 = await hashPassword(password);
  expect(hash1).not.toBe(hash2);
});

it("should return false for invalid hash input", async () => {
  const password = "Test Password";
  const invalidHash = "not-a-valid-hash";
  const isValid = await verifyPasswordHash(invalidHash, password);
  expect(isValid).toBe(false);
});

it("should flag case variance as an incorrect password", async () => {
  const password = "Test Password";
  const incorrectPassword = password.toLowerCase();
  const hash = await hashPassword(password);
  const isValid = await verifyPasswordHash(hash, incorrectPassword);
  expect(isValid).toBe(false);
});
