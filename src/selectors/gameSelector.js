import { getGameColors } from '../util/colorUtils';
import { sizeSelector } from './boardSelector';

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

export const selectOrderHalfMove = state => {
  return state.orderHalfMove;
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

export const selectLegalMoves = state => state.legalMoves;

export const selectScore = state => state.score;

export const selectIsEndOfRound = state => {
  return selectRemainingPieces(state).length === 0;
};

export const selectResignedPlayer = state => state.resignedPlayer;

export const selectWinning = state => {
  const resigned = selectResignedPlayer(state);
  if (resigned) {
    const player1Name = selectPlayer1Name(state);
    const player2Name = selectPlayer2Name(state);
    return resigned === player1Name ? player2Name : player1Name;
  }
  const player1Score = selectPlayer1Score(state);
  const player2Score = selectPlayer2Score(state);
  if (player1Score > player2Score) {
    return selectPlayer1Name(state);
  }
  if (player2Score > player1Score) {
    return selectPlayer2Name(state);
  }
  return 'Nobody';
};

export const selectIsGameOver = state => {
  if (selectResignedPlayer(state)) return true;
  const round = selectRoundNumber(state);
  const endOfRound = selectIsEndOfRound(state);
  return endOfRound && round === 2;
};

export default selectNextTile;
