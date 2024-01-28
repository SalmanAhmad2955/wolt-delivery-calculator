import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../inputFiled/index";

const mockOnChange = jest.fn();

test("renders Input component correctly", () => {
  render(
    <Input
      label="Test Label"
      htmlFor="testInput"
      type="number"
      step="1"
      id="testInput"
      dataTestId="testInput"
      name="testInput"
    />
  );

  // check if the label and input are rendered
  expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
});

test("renders Input component correctly with supporting text", () => {
  render(
    <Input
      label="Test Label"
      htmlFor="testInput"
      type="number"
      step="1"
      id="testInput"
      dataTestId="testInput"
      name="testInput"
      supportingText="This is supporting text."
    />
  );

  // check if the supporting text is rendered
  expect(screen.getByText("This is supporting text.")).toBeInTheDocument();
});

test("renders Input component correctly with correct label", () => {
  render(
    <Input
      label="Test Label"
      htmlFor="testInput"
      type="number"
      step="1"
      id="testInput"
      dataTestId="testInput"
      name="testInput"
      supportingText="This is supporting text."
    />
  );

  // check if the supporting text is rendered
  expect(screen.getByText("Test Label")).toBeInTheDocument();
});

test("handles input change and calls onChange prop", () => {
  render(
    <Input
      label="Test Label"
      htmlFor="testInput"
      type="number"
      step="1"
      id="testInput"
      dataTestId="testInput"
      name="testInput"
      onChange={mockOnChange}
    />
  );

  // simulate user input
  (async () => {
    const elements = await screen.findAllByText("testInput");
    fireEvent.change(elements[0], {
      target: { value: "42" },
    });
    // check if the onChange prop is called with the correct arguments
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "42" }),
      })
    );
  })();
});

test("displays error border for invalid input", () => {
  render(
    <Input
      label="Test Label"
      htmlFor="testInput"
      type="number"
      step="1"
      id="testInput"
      dataTestId="testInput"
      name="testInput"
      min="1"
      max="10"
    />
  );

  // simulate user input
  (async () => {
    const elements = await screen.findAllByText("testInput");
    fireEvent.change(elements[0], {
      target: { value: "20" },
    });
    // Check if the error border is applied
    expect(screen.getByTestId("testInput")).toHaveClass("border-red-500");
  })();
});

test('displays error border for non-numeric input with type "number"', () => {
  render(
    <Input
      label="Test Label"
      htmlFor="testInput"
      type="number"
      step="1"
      id="testInput"
      dataTestId="testInput"
      name="testInput"
      min="1"
      max="10"
    />
  );

  // simulate user input
  (async () => {
    const elements = await screen.findAllByText("testInput");
    fireEvent.change(elements[0], {
      target: { value: "abc" },
    });
    // check if the error border is applied
    expect(screen.getByTestId("testInput")).toHaveClass("border-red-500");
  })();
});
