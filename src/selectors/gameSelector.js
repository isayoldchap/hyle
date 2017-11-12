
export const nextTile = (state) => {
  const colorSequence = state.remainingPieces;
  return colorSequence && colorSequence.length > 0 ? colorSequence[0] : undefined;
};

export default nextTile;
