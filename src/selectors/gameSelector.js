import { getGameColors } from "../util/colorUtils";
import { sizeSelector } from "../selectors/boardSelector";

export const selectRemainingColorCounts = state => {
  return state.remainingColorCounts; 
};

export const selectNextTile = state => {
  return state.nextPiece;
};

export const selectColors = state => {
  const size = sizeSelector(state);
  return getGameColors(size);
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
