import { Roles } from '../engine/engine';
import { getBestOrderMove, getBestChaosMove } from './minimax';

// Determines whether the current turn should be played by the AI.
// Round 1: Player 1 = Chaos, Player 2 = Order
// Round 2: Player 1 = Order, Player 2 = Chaos
export const isAITurn = state => {
  const { turn, round, aiConfig } = state;
  const { player1IsAI = false, player2IsAI = false } = aiConfig || {};
  return (
    (turn === Roles.CHAOS && round === 1 && player1IsAI) ||
    (turn === Roles.ORDER && round === 1 && player2IsAI) ||
    (turn === Roles.CHAOS && round === 2 && player2IsAI) ||
    (turn === Roles.ORDER && round === 2 && player1IsAI)
  );
};

// Returns the best move for the current turn.
// Order moves: { start, end } or { pass: true }
// Chaos moves: { cell: { x, y } } or { pass: true }
export const getAIMove = (board, turn, nextPiece) => {
  if (turn === Roles.ORDER) {
    return getBestOrderMove(board, nextPiece);
  }
  const cell = getBestChaosMove(board, nextPiece);
  return cell ? { cell } : { pass: true };
};
