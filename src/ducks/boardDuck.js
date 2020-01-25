import { moveTileOnBoard, placeTileOnBoard, selectAllSquares, selectEmptySquares, selectOccupiedSquares, selectLegalMoves, allMovesFromLocation } from "../board";

export const moveTile = (state, startLocation, endLocation) => {
  const boardState = selectBoard(state);
  return moveTileOnBoard(boardState, startLocation, endLocation);
};

export const placeTile = (state, rowIndex, colIndex, color) => {
  const boardState = state.board;
  return placeTileOnBoard(boardState, rowIndex, colIndex, color);
};

// selector functions start here

export const selectBoard = state => state.board;

export const sizeSelector = state => {
  return selectBoard(state).length;
};

export const squaresSelector = state => {
  const board = selectBoard(state);
  return selectAllSquares(board);
};

export const emptySquaresSelector = state => {
  return selectEmptySquares(selectBoard(state));
};

export const legalChaosMovesSelector = emptySquaresSelector;

export const occupiedSquareSelector = state => {
  return selectOccupiedSquares(selectBoard(state));
};

export const legalOrderMoveSelector = state => {
  const board = selectBoard(state);
  const occupiedSquares = selectOccupiedSquares(board);
  return occupiedSquares.reduce((allMoves, startSquare) => {
    console.log(startSquare);
    return allMoves.concat(allLegalMovesFromSquare(state, startSquare))
  }, []);
};

export const allLegalMovesFromSquare = (state, startSquare) => {
  const board = selectBoard(state);
  return selectLegalMoves(board, startSquare);
};

export const allLegalMovesFromLocation = (state, location) => {
  return allMovesFromLocation(location, selectBoard(state));
}

export const boardSelector = state => state.board;
