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
  return state.config.boardSize;
};

export const selectRoundNumber = state => {
  return state.round;
};

export const selectPlayer1Score = state => {
  return state.player1Score;
};

export const selectPlayer2Score = state => {
  return state.player2Score;
};

export const selectConfig = state => state.config || {};

export const selectPlayer1Name = state => selectConfig(state).player1Name;

export const selectPlayer2Name = state => selectConfig(state).player2Name;

export const selectTurn = state => state.turn;

export const selectOrderHalfMove = state => state.orderHalfMove;

export const selecLegalMoves = state => state.legalMoves;

export const selectIsEndOfRound = state => {
  return selectRemainingPieces(state).length === 0;
};

export const selectWinning = state => {
  const player1Score = selectPlayer1Score(state);
  const player2Score = selectPlayer2Score(state);
  if (player1Score > player2Score) {
    return selectPlayer1Name(state);
  } else if (player2Score > player1Score) {
    return selectPlayer2Name(state);
  } else {
    return 'Nobody';
  }
}

export const selectIsGameOver = state => {
  const round = selectRoundNumber(state);
  const endOfRound = selectIsEndOfRound(state);
  return (endOfRound && round === 2);
};

export default selectNextTile;
