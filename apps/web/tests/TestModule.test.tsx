import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import TestModule from "../src/components/TestModule";

test("Can render a component", async () => {
  render(<TestModule />);

  const locator = await screen.findByText("Hello World!");
  expect(locator).toBeDefined();
});
