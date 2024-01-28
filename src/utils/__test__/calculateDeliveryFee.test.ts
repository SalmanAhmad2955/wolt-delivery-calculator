import deliveryFeeCalculator from "../calculateDeliveryFee";

describe("deliveryFeeCalculator", () => {
  it("should provide free delivery for cart value equal to or more than 200€", () => {
    const formState = {
      cartValue: 200,
      deliveryDistance: 1501,
      numItems: 14,
      orderTime: "2024-01-26T12:00:00Z",
    };
    expect(deliveryFeeCalculator(formState)).toBe(0);
  });

  it("should correctly calculate small order surcharge for cart value less than 10€ without rush hours", () => {
    const formState = {
      cartValue: 20,
      deliveryDistance: 1000,
      numItems: 1,
      orderTime:
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState)).toBe(2);
  });

  it("should correctly calculate small order surcharge for cart value less than 10€ with rush hours", () => {
    const formState = {
      cartValue: 20,
      deliveryDistance: 1000,
      numItems: 1,
      orderTime:
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState)).toBe(2.4);
  });

  it("should correctly calculate delivery fee based on distance without rush hour", () => {
    const formState1 = {
      cartValue: 15,
      deliveryDistance: 1499,
      numItems: 5,
      orderTime:
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState1)).toBe(3.5);

    const formState2 = {
      cartValue: 15,
      deliveryDistance: 1500,
      numItems: 5,
      orderTime:
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState2)).toBe(3.5);

    const formState3 = {
      cartValue: 15,
      deliveryDistance: 1501,
      numItems: 5,
      orderTime:
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState3)).toBe(4.5);
  });

  it("should correctly calculate delivery fee based on distance with rush hour", () => {
    const formState1 = {
      cartValue: 15,
      deliveryDistance: 1499,
      numItems: 5,
      orderTime:
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState1)).toBe(4.2);

    const formState2 = {
      cartValue: 15,
      deliveryDistance: 1500,
      numItems: 5,
      orderTime:
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState2)).toBe(4.2);

    const formState3 = {
      cartValue: 15,
      deliveryDistance: 1501,
      numItems: 5,
      orderTime:
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState3)).toBe(5.4);
  });

  it("should correctly calculate item surcharge and bulk fee without rush hours", () => {
    const formState1 = {
      cartValue: 15,
      deliveryDistance: 1501,
      numItems: 11,
      orderTime:
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState1)).toBe(7.5);

    const formState2 = {
      cartValue: 15,
      deliveryDistance: 1501,
      numItems: 13,
      orderTime:
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState2)).toBe(9.7);
  });
  it("should correctly calculate item surcharge and bulk fee with rush hours", () => {
    const formState1 = {
      cartValue: 15,
      deliveryDistance: 1501,
      numItems: 11,
      orderTime:
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState1)).toBe(9);

    const formState2 = {
      cartValue: 15,
      deliveryDistance: 1501,
      numItems: 13,
      orderTime:
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)",
    };
    expect(deliveryFeeCalculator(formState2)).toBe(11.64);
  });

  it("should apply rush hour multiplier during Friday rush hours", () => {
    const rushHourFormState = {
      cartValue: 20,
      deliveryDistance: 1501,
      numItems: 10,
      orderTime:
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)",
    };
    const nonRushHourFormState = {
      cartValue: 15,
      deliveryDistance: 1501,
      numItems: 15,
      orderTime:
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)",
    };

    expect(deliveryFeeCalculator(rushHourFormState)).toBe(8.4);
    expect(deliveryFeeCalculator(nonRushHourFormState)).toBe(10.7);
  });
});
