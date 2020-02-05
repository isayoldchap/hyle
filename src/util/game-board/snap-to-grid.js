export const snapToGrid = (x, y, cellSize = 32) => {
  const snappedX = Math.round(x / cellSize) * cellSize;
  const snappedY = Math.round(y / cellSize) * cellSize;
  return [snappedX, snappedY];
};
