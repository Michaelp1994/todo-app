import { test, expect } from "@playwright/test";
import cleanDatabase from "../src/utils/cleanDatabase";
import { faker } from "@faker-js/faker";

const todo = {
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  dueDate: faker.date.soon({ days: 10 }).toISOString().split("T")[0],
  completed: false,
  important: false,
  order: 1,
  userId: 1,
};

test.describe("Creating a todo", () => {
  test.beforeAll(async ({}) => {
    await cleanDatabase();
  });

  test("should create a todo", async ({ page }) => {
    await page.goto("localhost:5173/todos");
    await page.getByLabel(/title/i).fill(todo.title);
    await page.getByLabel(/description/i).fill(todo.description);
    await page.getByLabel(/due date/i).fill(todo.dueDate);
    await page.getByRole("button", { name: /create/i }).click();
    expect(page.getByText(todo.title)).toBeDefined();
  });
});
