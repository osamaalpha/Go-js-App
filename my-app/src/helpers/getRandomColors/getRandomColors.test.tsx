import { getRandomColor } from "./getRandomColors";

describe("getRandomColor", () => {
  // Utility to check if a color is close to white
  const isCloseToWhite = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return r > 200 && g > 200 && b > 200;
  };

  test("should return a valid hex color", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/); // Checks if it's a valid hex color
  });

  test("should not return white or colors close to white", () => {
    for (let i = 0; i < 1000; i++) {
      // Run multiple tests to ensure randomness is handled
      const color = getRandomColor();
      expect(isCloseToWhite(color)).toBe(false); // Ensure the color is not close to white
    }
  });

  test("should generate unique colors in multiple calls", () => {
    const colors = new Set();
    for (let i = 0; i < 1000; i++) {
      const color = getRandomColor();
      colors.add(color);
    }
    expect(colors.size).toBe(1000); // All colors should be unique in 1000 calls
  });
});
