import calculateDistanceFee from "../calculateDistanceFee";

describe("calculateDistanceFee", () => {
  it("should return 2€ for a delivery distance of 1-1000 meters", () => {
    expect(calculateDistanceFee(100)).toBe(2);
    expect(calculateDistanceFee(1000)).toBe(2);
  });

  it("should return 3€ for a delivery distance of 1001-1500 meter", () => {
    expect(calculateDistanceFee(1001)).toBe(3);
    expect(calculateDistanceFee(1500)).toBe(3);
  });

  it("should return 4€ for a delivery distance of 1501-2000 meters", () => {
    expect(calculateDistanceFee(1501)).toBe(4);
    expect(calculateDistanceFee(2000)).toBe(4);
  });
  it("should return 4€ for a delivery distance of 2001-2500 meters", () => {
    expect(calculateDistanceFee(1501)).toBe(4);
    expect(calculateDistanceFee(2000)).toBe(4);
  });
});
