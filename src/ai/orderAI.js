import { legalOrderMoveSelector } from '../util/moveUtils';
import { moveTileOnBoard, allRowsAndColumns } from '../util/boardUtils';
import { scoreBoard } from './boardScorer';

// Counts matching symmetric pairs across all rows/columns.
// e.g. R _ _ _ R guarantees a palindrome regardless of what fills the gaps.
const potentialScore = board => {
  const lines = allRowsAndColumns(board);
  return lines.reduce((total, line) => {
    const n = line.length;
    let score = 0;
    for (let i = 0; i < Math.floor(n / 2); i++) {
      const left = line[i];
      const right = line[n - 1 - i];
      if (left.color && right.color && left.color === right.color) {
        score += 2;
      }
    }
    return total + score;
  }, 0);
};

// Rewards placing pieces on or near edges (edge = best, center = worst).
const edgeScore = (end, boardSize) => {
  const distFromEdge = Math.min(end.x - 1, boardSize - end.x, end.y - 1, boardSize - end.y);
  return Math.floor(boardSize / 2) - distFromEdge;
};

// Combined evaluation: actual score dominates, then potential, then edge position.
const ACTUAL_WEIGHT = 1000;
const POTENTIAL_WEIGHT = 10;
const EDGE_WEIGHT = 1;

export const evalBoard = (board, end) => {
  const actual = scoreBoard(board);
  const potential = potentialScore(board);
  const edge = end ? edgeScore(end, board.length) : 0;
  return actual * ACTUAL_WEIGHT + potential * POTENTIAL_WEIGHT + edge * EDGE_WEIGHT;
};

export const getBestOrderMove = board => {
  const legalMoves = legalOrderMoveSelector(board);

  if (legalMoves.length === 0) return { pass: true };

  const passEval = evalBoard(board, null);
  let bestMove = null;
  let bestEval = passEval;

  for (const move of legalMoves) {
    const newBoard = moveTileOnBoard(board, move.start, move.end);
    const eval_ = evalBoard(newBoard, move.end);
    if (eval_ > bestEval) {
      bestEval = eval_;
      bestMove = move;
    }
  }

  if (!bestMove) return { pass: true };
  return { start: bestMove.start, end: bestMove.end };
};
