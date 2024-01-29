import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DeliveryFeeCalculator } from "../DeliveryFeeCalculator";

test("renders DeliveryFeeCalculator component", () => {
  render(<DeliveryFeeCalculator />);
  const headerElement = screen.getByText("Delivery Fee Calculator");
  expect(headerElement).toBeInTheDocument();
});

test("calculates delivery fee on form submission without rush hours", async () => {
  render(<DeliveryFeeCalculator />);

  fireEvent.change(await screen.findByLabelText("Cart Value"), {
    target: { value: "50" },
  });
  fireEvent.change(await screen.findByLabelText("Delivery Distance"), {
    target: { value: "1000" },
  });
  fireEvent.change(await screen.findByLabelText("Number of items"), {
    target: { value: "3" },
  });
  fireEvent.change(await screen.findByLabelText("Time"), {
    target: { value: "2024-01-28T01:07" },
  });

  fireEvent.click(screen.getByText("Calculate delivery fee"));
  const resultElement = screen.getByText("Delivery Fee For Your Order Is : 2€");
  expect(resultElement).toBeInTheDocument();
});

test("calculates delivery fee on form submission with rush hours", async () => {
  render(<DeliveryFeeCalculator />);

  fireEvent.change(await screen.findByLabelText("Cart Value"), {
    target: { value: "50" },
  });
  fireEvent.change(await screen.findByLabelText("Delivery Distance"), {
    target: { value: "1000" },
  });
  fireEvent.change(await screen.findByLabelText("Number of items"), {
    target: { value: "3" },
  });
  fireEvent.change(await screen.findByLabelText("Time"), {
    target: { value: "2024-01-26T15:07" },
  });

  fireEvent.click(screen.getByText("Calculate delivery fee"));
  const resultElement = screen.getByText(
    "Delivery Fee For Your Order Is : 2.4€"
  );
  expect(resultElement).toBeInTheDocument();
});
