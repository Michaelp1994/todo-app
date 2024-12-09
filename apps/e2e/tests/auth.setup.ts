import { test as setup, expect } from "@playwright/test";
import { join } from "path";

const authFile = join(import.meta.dirname, "../playwright/.auth/user.json");

setup.use({ storageState: { cookies: [], origins: [] } });

setup("log test user in", async ({ page }) => {
  if (!process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) {
    throw new Error("Missing TEST_EMAIL or TEST_PASSWORD env var");
  }
  await page.goto("localhost:5173/login");
  expect(await page.title()).toBe("Todo App");
  await page.getByLabel(/email/i).fill(process.env["TEST_EMAIL"]);
  await page.getByLabel(/password/i).fill(process.env["TEST_PASSWORD"]);
  await page.getByRole("button", { name: /login/i }).click();
  await page.getByText(/user logged in/i).waitFor({ state: "attached" });
  await page.context().storageState({ path: authFile });
});
