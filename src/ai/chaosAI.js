import { legalChaosMovesSelector } from '../util/moveUtils';
import { placeTileOnBoard, moveTileOnBoard } from '../util/boardUtils';
import { getBestOrderMove } from './orderAI';
import { scoreBoard } from './boardScorer';

export const getBestChaosMove = (board, nextPiece) => {
  const emptyCells = legalChaosMovesSelector(board);

  if (emptyCells.length === 0) return null;

  let bestCell = emptyCells[0];
  let lowestScore = Infinity;

  for (const cell of emptyCells) {
    const boardAfterChaos = placeTileOnBoard(board, cell.y, cell.x, nextPiece);

    // Simulate Order's best response to this placement
    const orderMove = getBestOrderMove(boardAfterChaos);
    const boardAfterOrder = orderMove.pass
      ? boardAfterChaos
      : moveTileOnBoard(boardAfterChaos, orderMove.start, orderMove.end);

    const score = scoreBoard(boardAfterOrder);

    if (score < lowestScore) {
      lowestScore = score;
      bestCell = cell;
    }
  }

  return bestCell; // { x, y }
};
