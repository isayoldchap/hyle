import { transformArrayElement, swapArrayElement } from "../util/arrayUtil";

const up = cell => {
  return { x: cell.x, y: cell.y - 1 };
};
const down = cell => {
  return { x: cell.x, y: cell.y + 1 };
};
const left = cell => {
  return { x: cell.x - 1, y: cell.y };
};
const right = cell => {
  return { x: cell.x + 1, y: cell.y };
};
const allDirections = [up, down, left, right];

export const initializeBoard = size => {
  let rows = [];
  for (let row = 0; row < size; row++) {
    let currentRow = [];
    for (let col = 0; col < size; col++) {
      currentRow[col] = makeCell(row + 1, col + 1);
    }
    rows[row] = currentRow;
  }
  return rows;
};

export const moveTile = (state, startLocation, endLocation) => {
  const boardState = state.board;
  const startRow = getRow(boardState, startLocation.y);
  const endRow = getRow(boardState, endLocation.y);

  const cellWithColor = color => cell => {
    return Object.assign({}, cell, { color: color, showSelection: false });
  };

  const startSquareColor = startRow[startLocation.x - 1].color;

  const updatedStartRow = transformArrayElement(
    startRow,
    startLocation.x - 1,
    cellWithColor(undefined)
  );

  const endRowToUpdate =
    startLocation.y === endLocation.y ? updatedStartRow : endRow;

  const updatedEndRow = transformArrayElement(
    endRowToUpdate,
    endLocation.x - 1,
    cellWithColor(startSquareColor)
  );

  const updatedBoard = swapArrayElement(
    boardState,
    startLocation.y - 1,
    updatedStartRow
  );
  const updatedBoard2 = swapArrayElement(
    updatedBoard,
    endLocation.y - 1,
    updatedEndRow
  );

  return updatedBoard2;
};

export const placeTile = (state, rowIndex, colIndex, color) => {
  const boardState = state.board;

  const rowToUpdate = getRow(boardState, rowIndex);
  const cellWithColor = cell => {
    return Object.assign({}, cell, { color: color });
  };

  const updatedRow = transformArrayElement(
    rowToUpdate,
    colIndex - 1,
    cellWithColor
  );
  const updatedBoard = swapArrayElement(boardState, rowIndex - 1, updatedRow);

  return updatedBoard;
};

const makeCell = (row, column, color = undefined) => {
  return {
    row: row,
    col: column,
    key: row + ":" + column,
    color: color
  };
};

// selector functions start here

export const getCell = (board, row, col) => {
  return board[transformIndex(row)][transformIndex(col)];
};

export const allRowsAndColumns = board => {
  const rows = getRows(board);
  const columns = getColumns(board);
  const all = rows.concat(columns);

  return all;
};

const getColumns = board => {
  const columns = [];
  for (let col = 1; col <= board.length; col++) {
    columns.push(getColumn(board, col));
  }
  return columns;
};

const getRows = board => {
  return board;
};

export const getRow = (board, row) => {
  return board[transformIndex(row)];
};

const getColumn = (board, col) => {
  return board.map(row => row[transformIndex(col)]);
};

const transformIndex = boardIndex => {
  return boardIndex - 1;
};

export const sizeSelector = state => {
  return boardSelector(state).length;
};

export const squareAtLocationSelector = (state, location) => {
  if (location.y < 1 || location.y > state.board.length) return undefined;
  if (location.x < 1 || location.x > state.board.length) return undefined;

  const squareAtLocation = getCell(state.board, location.y, location.x);
  return squareAtLocation;
};

// convert with reducer function
export const squaresSelector = state => {
  return boardSelector(state).reduce(
    (allSquares, row) => allSquares.concat(row),
    []
  );
};

export const isOccupied = square => square && square.color !== undefined;

export const isEmpty = square => square && square.color === undefined;

export const emptySquaresSelector = state => {
  return squaresSelector(state).filter(isEmpty);
};

export const legalChaosMovesSelector = emptySquaresSelector;

export const occupiedSquareSelector = state => {
  return squaresSelector(state).filter(isOccupied);
};

export const legalOrderMoveSelector = state => {
  const occupiedSquares = occupiedSquareSelector(state);
  const allLegalMoves = occupiedSquares.reduce((allMoves, startSquare) => {
    const allFromSquare = allMovesFromSquare(startSquare, state);
    return allMoves.concat(allFromSquare);
  }, []);

  return allLegalMoves;
};

export const allLegalMovesFromSquare = (state, startSquare) => {
  const xyLocation = transformSquareToLocation(startSquare);
  return allLegalMovesFromLocation(state, xyLocation);
};

export const allMovesFromSquare = (startSquare, board) => {
  const startLocation = transformSquareToLocation(startSquare);
  return allMovesFromLocation(startLocation, board);
};

export const allLegalMovesFromLocation = (state, startLocation) => {
  const startSquare = squareAtLocationSelector(state, startLocation);
  if (startSquare === undefined || startSquare.color === undefined) return [];
  else return allMovesFromLocation(startLocation, state);
};

export const allMovesFromLocation = (startLocation, state) => {
  const allFromSquare = allDirections.reduce((allMoves, direction) => {
    const allMovesFromLocation = allMovesFromLocationInDirection(
      startLocation,
      direction,
      state
    );
    return allMoves.concat(allMovesFromLocation);
  }, []);

  return allFromSquare;
};

export const transformSquareToLocation = square => {
  return {
    x: square.col,
    y: square.row
  };
};

function* generateLocationsInDirection(origin, applyDirection) {
  let currentLocation = { x: origin.x, y: origin.y };

  while (true) {
    currentLocation = applyDirection(currentLocation);
    yield currentLocation;
  }
}

export const allMovesFromLocationInDirection = (
  startLocation,
  direction,
  board
) => {
  const pathGenerator = generateLocationsInDirection(startLocation, direction);
  let allMovesInDirection = [];
  let nextOnPath = pathGenerator.next().value;
  let squareAtLocation = squareAtLocationSelector(board, nextOnPath);

  while (squareAtLocation && squareAtLocation.color === undefined) {
    allMovesInDirection = allMovesInDirection.concat({
      start: startLocation,
      end: nextOnPath
    });
    nextOnPath = pathGenerator.next().value;
    squareAtLocation = squareAtLocationSelector(board, nextOnPath);
  }

  return allMovesInDirection;
};

export const boardSelector = state => state.board;
