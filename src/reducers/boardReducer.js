//import generateGamePieceSequence from '../util/SequenceGenerator';
import Chance from 'chance';

const boardReducer = (state = initializeBoard(5), action) => {
  if (!action) return state;
  return state;
};

export const transformArrayElement = (array, index, updateFunction) => {
  return array.map((currentElement, currentIndex) => {
    if (currentIndex !== index) {
      return currentElement;
    } else {
      return updateFunction(currentElement);
    }
  });
}

export const swapArrayElement = (array, index, updatedElement) => {
  return array.map((currentElement, currentIndex) => {
    if (currentIndex !== index) {
      return currentElement;
    } else {
      return updatedElement;
    }
  });
}

export const moveTile = (state, startLocation, endLocation) => {
  const boardState = state.board;
  const startRow = getRow(boardState, startLocation.y);
  const endRow = getRow(boardState, endLocation.y);

  const cellWithColor = (color) => (cell) => {
    return Object.assign({}, cell, {color: color, showSelection: false});
  };

  const startSquareColor = startRow[startLocation.x-1].color;

  const updatedStartRow = transformArrayElement(startRow, startLocation.x-1, cellWithColor(undefined));

  const endRowToUpdate = startLocation.y === endLocation.y ? updatedStartRow : endRow;

  const updatedEndRow = transformArrayElement(endRowToUpdate, endLocation.x-1, cellWithColor(startSquareColor));

  const updatedBoard = swapArrayElement(boardState, startLocation.y-1, updatedStartRow);
  const updatedBoard2 = swapArrayElement(updatedBoard, endLocation.y-1, updatedEndRow);

  return updatedBoard2;
}

export const placeTile = (state, rowIndex, colIndex, color) => {
  const boardState = state.board;

  const rowToUpdate = getRow(boardState, rowIndex);
  const cellWithColor = (cell) => {
    return Object.assign({}, cell, {color: color});
  };

  const updatedRow = transformArrayElement(rowToUpdate, colIndex-1, cellWithColor);
  const updatedBoard = swapArrayElement(boardState, rowIndex-1, updatedRow);

  return updatedBoard;
}

export const initializeBoard = (size) => {
  let rows = [];
  for (let row = 0; row < size; row++) {
    let currentRow = [];
    for (let col = 0; col < size; col++) {
      currentRow[col] = makeCell(row +1, col+1);
    }
    rows[row] = currentRow;
  }
  return rows;
};

const makeCell = (row, column, color = undefined) => {
  return {
    row: row,
    col: column,
    color: color,
    key: row + ":" + column
  }
};

export const allRowsAndColumns = (board) => {
  const rows = getRows(board);
  const columns = getColumns(board);
  const all = rows.concat(columns);

  return all;
};

const getColumns = (board) => {
  const columns = [];
  for (let col = 1; col <= board.length; col++ ){
    columns.push(getColumn(board, col))
  }
  return columns;
};

const getRows = (board) => {
  return board;
};

export const getRow = (board, row) => {
  return board[transformIndex(row)];
};

const getColumn = (board, col) => {
  return board.map(row =>
    row[transformIndex(col)]
  );
};

export const getCell = (board, row, col) => {
  return board[transformIndex(row)][transformIndex(col)];
};

const transformIndex = (boardIndex) => {
  return boardIndex-1;
}

export default boardReducer;
