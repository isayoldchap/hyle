import { selectAllSquares } from '../util/boardUtils';

export const selectBoard = state => state.board;

export const sizeSelector = state => {
  return selectBoard(state).length;
};

export const squaresSelector = state => {
  const board = selectBoard(state);
  return selectAllSquares(board);
};
