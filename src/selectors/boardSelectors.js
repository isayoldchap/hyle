import {allRowsAndColumns} from '../reducers/boardReducer'

export const sizeSelector = (state) => {
  return boardSiloSelector(state).board.length;
}

export const squaresSelector = (state) => {
  let squares = [];
  boardSelector(state).forEach(row =>
    row.forEach(cell => squares.push(cell))
  );
  return squares;
}

export const boardSelector = (state) => boardSiloSelector(state).board;

export const boardSiloSelector = (state) => state.boardSilo;
