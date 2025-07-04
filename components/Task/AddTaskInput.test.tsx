import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddTaskInput from "./AddTaskInput";

test("renders a input field to add new Tasks", () => {
  render(<AddTaskInput afterSubmit={() => {}} />);
  const input = screen.getByRole("textbox", { name: /add New Task/i });

  expect(input).toBeInTheDocument();
});
