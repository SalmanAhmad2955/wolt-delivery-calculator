import { render, screen, fireEvent } from "@testing-library/react";
import { ShowResult } from "../Result/index";

// Mock setShowResult function
const mockSetShowResult = jest.fn();

// Mock Result prop
const mockResult = 42;

test("renders ShowResult component with delivery price", () => {
  render(<ShowResult Result={mockResult} setShowResult={mockSetShowResult} />);

  // Check if the text with delivery price is rendered
  expect(
    screen.getByText(`Delivery Fee For Your Order Is : ${mockResult}€`)
  ).toBeInTheDocument();
});

test("renders ShowResult component with free delivery message", () => {
  render(<ShowResult Result={0} setShowResult={mockSetShowResult} />);

  // Check if the text with free delivery message is rendered
  expect(screen.getByText("Your Delivery Is Free 🎉")).toBeInTheDocument();
});

test("calls setShowResult when Back to the calculator button is clicked", () => {
  render(<ShowResult Result={mockResult} setShowResult={mockSetShowResult} />);

  fireEvent.click(screen.getByText("Back to the calculator"));

  expect(mockSetShowResult).toHaveBeenCalledWith(false);
});
