import { ALL_COLORS } from "../engine/engine";
import { sizeSelector } from "../ducks/boardDuck";
import { computeRemainingColorCounts } from "../util/colorCounts";

export const selectRemainingColorCounts = state => {
  const remainingColors = selectRemainingPieces(state);
  return computeRemainingColorCounts(remainingColors);
};

export const selectNextTile = state => {
  const colorSequence = selectRemainingPieces(state);
  return colorSequence && colorSequence.length > 0
    ? colorSequence[0]
    : undefined;
};

export const selectColors = state => {
  const size = sizeSelector(state);
  return ALL_COLORS.slice(0, size);
};

export const selectRemainingPieces = state => {
  return state.remainingPieces;
};

export const selectMoveNumber = state => {
  return state.moveNumber;
};

export const selectBoardSize = state => {
  return state.board.length;
};

export const selectRoundNumber = state => {
  return state.roundNumber;
};

export const selectTurn = state => {
  return state.turn;
};

export const selectIsEndOfRound = state => {
  return selectRemainingPieces(state).length === 0;
};

export default selectNextTile;
