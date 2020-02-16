import {
  transformArrayElement,
  swapArrayElement,
  makeIntArrayOfSize
} from './arrayUtils';

const up = cell =>
  cellTransform(
    cell,
    x => x,
    y => y - 1
  );
const down = cell =>
  cellTransform(
    cell,
    x => x,
    y => y + 1
  );
const left = cell =>
  cellTransform(
    cell,
    x => x - 1,
    y => y
  );
const right = cell =>
  cellTransform(
    cell,
    x => x + 1,
    y => y
  );

const allDirections = [up, down, left, right];

const cellTransform = (cell, xDelta, yDelta) => ({
  x: xDelta(cell.x),
  y: yDelta(cell.y)
});

export const isOccupied = square => square && square.color !== undefined;

export const isEmpty = square => !isOccupied(square);

export const initializeBoard = (size, makeCell) =>
  makeIntArrayOfSize(size).map(row =>
    makeIntArrayOfSize(size).map(col => makeCell(row, col))
  );

export const getCell = (board, row, col) => {
  return board[transformIndex(row)][transformIndex(col)];
};

function* generateLocationsInDirection(origin, applyDirection) {
  let currentLocation = { x: origin.x, y: origin.y };

  while (true) {
    currentLocation = applyDirection(currentLocation);
    yield currentLocation;
  }
}

export const transformSquareToLocation = square => {
  return {
    x: square.col,
    y: square.row
  };
};

export const allRowsAndColumns = board => {
  const rows = getRows(board);
  const columns = getColumns(board);
  return rows.concat(columns);
};

const getColumns = board => {
  return makeIntArrayOfSize(board.length).map(col => getColumn(board, col));
};

const getRows = board => board;

export const getRow = (board, row) => board[transformIndex(row)];

const getColumn = (board, col) => board.map(row => row[transformIndex(col)]);

const transformIndex = boardIndex => boardIndex - 1;

const cellWithColor = color => cell => {
  return { ...cell, color };
};

const emptiedCell = cell => {
  return { ...cell, showSelection: false, color: undefined };
};

const toLocation = cell => ({ x: cell.col, y: cell.row });

export const selectAllSquares = (board = []) => {
  return board.reduce((allSquares, row) => allSquares.concat(row), []);
};

export const selectEmptySquares = board => {
  return selectAllSquares(board)
    .filter(isEmpty)
    .map(toLocation);
};

export const selectOccupiedSquares = board => {
  return selectAllSquares(board).filter(isOccupied);
};

export const moveTileOnBoard = (board, startLocation, endLocation) => {
  const startRow = getRow(board, startLocation.y);
  const endRow = getRow(board, endLocation.y);

  const startSquareColor = startRow[startLocation.x - 1].color;

  const updatedStartRow = transformArrayElement(
    startRow,
    startLocation.x - 1,
    emptiedCell
  );

  const endRowToUpdate =
    startLocation.y === endLocation.y ? updatedStartRow : endRow;

  const updatedEndRow = transformArrayElement(
    endRowToUpdate,
    endLocation.x - 1,
    cellWithColor(startSquareColor)
  );

  const updatedBoard = swapArrayElement(
    board,
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

export const placeTileOnBoard = (board, rowIndex, colIndex, color) => {
  const rowToUpdate = getRow(board, rowIndex);

  const updatedRow = transformArrayElement(
    rowToUpdate,
    colIndex - 1,
    cellWithColor(color)
  );
  const updatedBoard = swapArrayElement(board, rowIndex - 1, updatedRow);

  return updatedBoard;
};

export const selectLegalMoves = (board, startSquare) => {
  const xyLocation = transformSquareToLocation(startSquare);
  return allMovesFromLocation(xyLocation, board);
};

export const allMovesFromLocation = (startLocation, board) => {
  const allFromSquare = allDirections.reduce((allMoves, direction) => {
    const allMovesFromLocation = allMovesFromLocationInDirection(
      startLocation,
      direction,
      board
    );
    return allMoves.concat(allMovesFromLocation);
  }, []);

  return allFromSquare;
};

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

export const squareAtLocationSelector = (board, location) => {
  if (location.y < 1 || location.y > board.length) return undefined;
  if (location.x < 1 || location.x > board.length) return undefined;

  const squareAtLocation = getCell(board, location.y, location.x);
  return squareAtLocation;
};
