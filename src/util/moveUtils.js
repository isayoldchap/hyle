import { moveTileOnBoard, placeTileOnBoard, selectEmptySquares, selectOccupiedSquares, selectLegalMoves, allMovesFromLocation } from "./boardUtils.test";
import { Roles } from '../engine/engine';

export const moveTile = (board, startLocation, endLocation) => {
  return moveTileOnBoard(board, startLocation, endLocation);
};

export const placeTile = (board, rowIndex, colIndex, color) => {
  return placeTileOnBoard(board, rowIndex, colIndex, color);
};

export const emptySquaresSelector = board => {
  return selectEmptySquares(board);
};

export const legalChaosMovesSelector = emptySquaresSelector;

export const occupiedSquareSelector = board => {
  return selectOccupiedSquares(board);
};

export const legalOrderMoveSelector = board => {
  const occupiedSquares = selectOccupiedSquares(board);
  return occupiedSquares.reduce((allMoves, startSquare) => {
    return allMoves.concat(allLegalMovesFromSquare(board, startSquare))
  }, []);
};

export const allLegalMovesFromSquare = (board, startSquare) => {
  return selectLegalMoves(board, startSquare);
};

export const allLegalMovesFromLocation = (board, location) => {
  return allMovesFromLocation(location, board);
}

export const allLegalMoves = (turn, board) => {
    if (turn === Roles.CHAOS) {
        return legalChaosMovesSelector(board);
    } else if (turn === Roles.ORDER) {
        return legalOrderMoveSelector(board);
    }
    return [];
};
