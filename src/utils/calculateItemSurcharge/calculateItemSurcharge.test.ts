import calculateItemSurcharge from ".";

describe("calculateItemSurcharge", () => {
  it("should return 0 for 4 or fewer items", () => {
    expect(calculateItemSurcharge(1)).toBe(0);
    expect(calculateItemSurcharge(4)).toBe(0);
  });

  it("should add 50 cents surcharge for each item above the fifth item", () => {
    expect(calculateItemSurcharge(5)).toBe(0.5);
    expect(calculateItemSurcharge(10)).toBe(3);
    expect(calculateItemSurcharge(13)).toBe(5.7);
    expect(calculateItemSurcharge(14)).toBe(6.2);
  });

  it("should add bulk fee for more than 12 items", () => {
    expect(calculateItemSurcharge(13)).toBe(5.7);
    expect(calculateItemSurcharge(14)).toBe(6.2);
  });
});
