import {getCell} from '../reducers/boardReducer'

const up    = (cell) => {return {x: cell.x, y: cell.y - 1}};
const down  = (cell) => {return {x: cell.x, y: cell.y + 1}};
const left  = (cell) => {return {x: cell.x - 1, y: cell.y}};
const right = (cell) => {return {x: cell.x + 1, y: cell.y}};
const allDirections = [up, down, left, right];

export const sizeSelector = (state) => {
  return boardSelector(state).length;
};

export const squareAtLocationSelector = (state, location) => {
  if (location.y < 1 || location.y > state.board.length) return undefined;
  if (location.x < 1 || location.x > state.board.length) return undefined;

  const squareAtLocation = getCell(state.board, location.y, location.x);
  return squareAtLocation;
};

// convert to using reducers
export const squaresSelector = (state) => {
  let squares = [];
  boardSelector(state).forEach(row =>
    row.forEach(cell => squares.push(cell))
  );
  return squares;
};

export const squaresOnBoardSelector = (board) => {
  let squares = [];
  board.forEach(row =>
    row.forEach(cell => squares.push(cell))
  );
  return squares;
};

export const emptySquaresSelector = (state) => {
  return squaresSelector(state).filter(square => square.color === undefined);
};

export const occupiedSquareSelector = (state) => {
  return squaresSelector(state).filter(square => square.color !== undefined);
};

export const legalOrderMoveSelector = (state) => {
  const allPossibleStartMoves = occupiedSquareSelector(state);
  const board = boardSelector(state);
  const allLegalMoves = allPossibleStartMoves.reduce((allMoves, startSquare) => {
    return allMoves.concat(allMovesFromSquare(startSquare, board))
  },[]);
  return allLegalMoves;
};

export const allLegalMovesFromSquare = (state, startLocation) => {
  const xyLocation = transformSquareToLocation(startLocation);
  return allLegalMovesFromLocation(state, xyLocation);
};

export const allLegalMovesFromLocation = (state, startLocation) => {
  const startSquare = squareAtLocationSelector(state, startLocation);
  if (startSquare.color === undefined) return [];
  else return allMovesFromLocation(startLocation, state);
};

export const allMovesFromLocation = (startLocation, state) => {
  const allFromSquare = allDirections.reduce((allMoves, direction) => {
    return allMoves.concat(allMovesFromLocationInDirection(startLocation, direction, state))
  }, []);

  return allFromSquare;
};

export const allMovesFromSquare = (startSquare, board) => {
  return allMovesFromLocation(transformSquareToLocation(startSquare), board);
};

export const transformSquareToLocation = (square) => {
  return {
    x: square.col,
    y: square.row
  };
};

function* generateLocationsInDirection(origin, applyDirection) {
  let currentLocation = {x: origin.x,y: origin.y};

  while (true) {
    currentLocation = applyDirection(currentLocation);
    yield(currentLocation);
  }
}

export const allMovesFromLocationInDirection = (startLocation, direction, board) => {
  const pathGenerator = generateLocationsInDirection(startLocation, direction);
  let allMovesInDirection = [];
  let nextOnPath = pathGenerator.next().value;
  let squareAtLocation = squareAtLocationSelector(board, nextOnPath);

  while (squareAtLocation && squareAtLocation.color === undefined) {
    allMovesInDirection = allMovesInDirection.concat(
      {
        start: startLocation,
        end: nextOnPath
      }
    );
    nextOnPath = pathGenerator.next().value;
    squareAtLocation = squareAtLocationSelector(board, nextOnPath);
  }

  return allMovesInDirection;
}

export const boardSelector = (state) => state.board;
