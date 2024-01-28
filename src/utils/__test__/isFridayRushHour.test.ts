import isFridayRushHour from "../isFridayRushHour";

describe("isFridayRushHour", () => {
  it("should return true during Friday rush hours (3 PM to 7 PM UTC)", () => {
    expect(
      isFridayRushHour(
        "Fri Jan 26 2024 15:00:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(true);
    expect(
      isFridayRushHour(
        "Fri Jan 26 2024 16:08:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(true);
    expect(
      isFridayRushHour(
        "Fri Jan 26 2024 17:08:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(true);
    expect(
      isFridayRushHour(
        "Fri Jan 26 2024 18:59:59 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(true);
  });

  it("should return false outside of Friday rush hours", () => {
    expect(
      isFridayRushHour(
        "Sat Jan 27 2024 15:00:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(false);

    expect(
      isFridayRushHour(
        "Sat Jan 27 2024 16:00:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(false);

    expect(
      isFridayRushHour(
        "Sat Jan 27 2024 17:00:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(false);
    expect(
      isFridayRushHour(
        "Sat Jan 27 2024 18:00:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(false);
    expect(
      isFridayRushHour(
        "Sat Jan 27 2024 19:00:00 GMT+0100 (Central European Standard Time)"
      )
    ).toBe(false);
  });
});
