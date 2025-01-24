export const getRandomColor = () => {
  let color;

  do {
    // Generate a random number between 0 and 16777215
    const randomNum = Math.floor(Math.random() * 16777216);
    // Convert the random number to a hexadecimal string
    color = `#${randomNum.toString(16).padStart(6, "0")}`;
    // Parse the color to get its RGB components
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Check if the color is too close to white (all components > 200)
    if (r <= 200 || g <= 200 || b <= 200) {
      break; // Acceptable color found
    }
  } while (true);

  return color;
};
