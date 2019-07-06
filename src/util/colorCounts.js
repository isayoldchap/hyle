
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
  