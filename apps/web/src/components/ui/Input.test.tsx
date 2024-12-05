import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

test("Input is associated with the label", async () => {
  render(<Input label="test" />);
  const textbox = screen.getByLabelText("test");
  expect(textbox).toBeDefined();
});
