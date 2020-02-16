const ALL_COLORS = [
  "Red",
  "Green",
  "Orange",
  "Blue",
  "Magenta",
  "Cyan",
  "Brown",
  "Silver",
  "Gray",
  "Yellow",
  "Navy",
  "Black"
];

export const getGameColors = count => ALL_COLORS.slice(0, count);

export const computeRemainingColorCounts = remainingColors => {
  const allCounts = remainingColors.reduce((colorCounts, color) => {
    if (!colorCounts[color]) {
      colorCounts[color] = 1;
    } else {
      const currentCount = colorCounts[color];
      colorCounts[color] = currentCount + 1;
    }
    return colorCounts;
  }, {});
  return sortColorCounts(allCounts);
};

const sortColorCounts = colorCounts => {
  return Object.keys(colorCounts)
    .map(color => {
      return { color, count: colorCounts[color] };
    })
    .sort((a, b) => {
      return b.count - a.count;
    });
};
