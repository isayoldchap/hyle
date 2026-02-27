import { evalBoard } from './orderAI';
import { legalOrderMoveSelector, legalChaosMovesSelector } from '../util/moveUtils';
import { moveTileOnBoard, placeTileOnBoard } from '../util/boardUtils';

export const DEFAULT_DEPTH = 4;

// Alpha-beta minimax. Returns an eval score from Order's perspective
// (higher = better for Order, lower = better for Chaos).
const minimax = (board, depth, isOrderTurn, alpha, beta, nextPiece) => {
  if (depth === 0) return evalBoard(board, null);

  if (isOrderTurn) {
    const moves = legalOrderMoveSelector(board);

    // Pass is always legal. Evaluate it by letting Chaos move on the
    // current board — same depth accounting as any real move.
    const passVal = minimax(board, depth - 1, false, alpha, beta, nextPiece);
    let best = passVal;
    alpha = Math.max(alpha, passVal);
    if (beta <= alpha) return best;

    for (const move of moves) {
      const newBoard = moveTileOnBoard(board, move.start, move.end);
      const val = minimax(newBoard, depth - 1, false, alpha, beta, nextPiece);
      if (val > best) {
        best = val;
        alpha = Math.max(alpha, val);
      }
      if (beta <= alpha) break;
    }
    return best;

  } else {
    const emptyCells = legalChaosMovesSelector(board);
    if (emptyCells.length === 0) return evalBoard(board, null);

    let best = Infinity;
    for (const cell of emptyCells) {
      const newBoard = placeTileOnBoard(board, cell.y, cell.x, nextPiece);
      const val = minimax(newBoard, depth - 1, true, alpha, beta, nextPiece);
      if (val < best) {
        best = val;
        beta = Math.min(beta, val);
      }
      if (beta <= alpha) break;
    }
    return best;
  }
};

// Picks Order's best move looking `depth` half-moves ahead.
// nextPiece is used for all Chaos nodes in the look-ahead tree.
export const getBestOrderMove = (board, nextPiece, depth = DEFAULT_DEPTH) => {
  const legalMoves = legalOrderMoveSelector(board);
  if (legalMoves.length === 0) return { pass: true };

  // Seed alpha with the pass eval so only genuinely better moves win
  const passEval = minimax(board, depth - 1, false, -Infinity, Infinity, nextPiece);
  let bestMove = null;
  let bestEval = passEval;
  let alpha = passEval;

  for (const move of legalMoves) {
    const newBoard = moveTileOnBoard(board, move.start, move.end);
    const val = minimax(newBoard, depth - 1, false, alpha, Infinity, nextPiece);
    if (val > bestEval) {
      bestEval = val;
      bestMove = move;
      alpha = val;
    }
  }

  return bestMove ? { start: bestMove.start, end: bestMove.end } : { pass: true };
};

// Picks Chaos's best placement looking `depth` half-moves ahead.
export const getBestChaosMove = (board, nextPiece, depth = DEFAULT_DEPTH) => {
  const emptyCells = legalChaosMovesSelector(board);
  if (emptyCells.length === 0) return null;

  let bestCell = emptyCells[0];
  let bestEval = Infinity;
  let beta = Infinity;

  for (const cell of emptyCells) {
    const newBoard = placeTileOnBoard(board, cell.y, cell.x, nextPiece);
    const val = minimax(newBoard, depth - 1, true, -Infinity, beta, nextPiece);
    if (val < bestEval) {
      bestEval = val;
      bestCell = cell;
      beta = val;
    }
  }

  return bestCell;
};
