
export const nextTile = (state) => {
  const colorSequence = state.remainingPieces;
  return colorSequence && colorSequence.length > 0 ? colorSequence[0] : undefined;
};

export const remainingPieces = (state) => {
  return state.remainingPieces;
};

export const moveNumber = (state) => {
  return state.moveNumber;
};

export const roundNumber = (state) => {
  return state.round;
};

export const turn = (state) => {
  return state.turn;
};

export default nextTile;
