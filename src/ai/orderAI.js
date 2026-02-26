import { legalOrderMoveSelector } from '../util/moveUtils';
import { moveTileOnBoard } from '../util/boardUtils';
import { scoreBoard } from './boardScorer';

export const getBestOrderMove = board => {
  const legalMoves = legalOrderMoveSelector(board);

  if (legalMoves.length === 0) return { pass: true };

  const currentScore = scoreBoard(board);
  let bestMove = null;
  let bestScore = currentScore; // passing keeps the current score

  for (const move of legalMoves) {
    const newBoard = moveTileOnBoard(board, move.start, move.end);
    const score = scoreBoard(newBoard);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  if (!bestMove) return { pass: true };
  return { start: bestMove.start, end: bestMove.end };
};
