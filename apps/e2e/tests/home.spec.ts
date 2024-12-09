import { test, expect } from "@playwright/test";

test("Home Page", async ({ page }) => {
  await page.goto("localhost:5173");
  expect(await page.title()).toBe("Todo App");
  expect(page.getByText("Welcome to the home page!")).toBeDefined();
});
