import {initializeBoard, placeTile, moveTile} from './boardReducer';
import {emptySquaresSelector, allLegalMovesFromLocation, allLegalMovesFromSquare} from '../selectors/boardSelectors';
import {nextTile} from '../selectors/gameSelector';
import generateGamePieceSequence from '../util/SequenceGenerator';

export const Roles = {
  Chaos: 'chaos',
  Order: 'order'
}

export const AllColors = [
  'Red',
  'Green',
  'Orange',
  'Blue',
  'Cyan',
  'Brown',
  'Magenta',
  'Gray',
  'Yellow',
  'Navy',
  'Black'
];

const initializeGame = (boardSize) => {
  const initialBoard = initializeBoard(boardSize);
  const colors = AllColors.slice(0, boardSize);
  const pieceSequence = generateGamePieceSequence(colors);

  return {
    colors: colors,
    board: initialBoard,
    round: 1,
    moveNumber:1,
    remainingPieces: pieceSequence,
    turn: Roles.Chaos,
    player1: {
      role: Roles.Chaos,
      name: 'Player 1',
    },
    player2: {
      role: Roles.Order,
      name: 'Player 2',
    }
  };
}

const chaosReducer = (state, action) => {
  switch (action.type) {
    case 'squareClicked':
      const emptySquares = emptySquaresSelector(state)
      const matchingSquare = emptySquares.find((square) => {
        return square.row === action.payload.row && square.col === action.payload.col;
      });

      if (!matchingSquare) return state;
      else {
        const nextColor = nextTile(state);
        const updatedBoard = placeTile(state, matchingSquare.row, matchingSquare.col, nextColor);
        const newState = Object.assign(
          {},
          state,
          {board: updatedBoard},
          {turn: Roles.Order},
          {remainingPieces: state.remainingPieces.slice(1)});
        return newState;
      }
    default:
      return state;
    }
};

const orderStartMoveReducer = (state, action) => {
  switch (action.type) {
    case 'squareClicked':
      const legalOrderMoves = allLegalMovesFromSquare(state, action.payload);
      if (legalOrderMoves.length > 0) {
        const halfMove = {x: action.payload.col, y: action.payload.row};
        return Object.assign({}, state, {orderHalfMove: halfMove});
      } else return state;
    case 'pass':
      return Object.assign({}, state, {turn: Roles.Chaos, orderHalfMove: undefined});
    default:
      return state;
  }
};

const orderEndMoveReducer = (state, action) => {
  switch (action.type) {
    case 'squareClicked':
      const startMove = state.orderHalfMove;
      const endMove = {x: action.payload.col, y: action.payload.row};
      const legalMoves = allLegalMovesFromLocation(state, startMove);
      const foundMove = legalMoves.find(move => {
        return move.end.x === endMove.x && move.end.y === endMove.y;
      });
      if (foundMove === undefined) {
        return Object.assign({}, state, {orderHalfMove: undefined});
      } else {
        const updatedBoard = moveTile(state, startMove, endMove);
        return Object.assign({},
          state,
          {board: updatedBoard, turn: Roles.Chaos, orderHalfMove: undefined}
        );
      }
    case 'pass':
      return Object.assign({}, state, {turn: Roles.Chaos, orderHalfMove: undefined});
    default:
      return state;
  }
};

const roleReducer = (role, orderHalfMove) => {
  if (role === Roles.Chaos) return chaosReducer;
  else if (orderHalfMove === undefined) return orderStartMoveReducer;
  else return orderEndMoveReducer;
};

const gameReducer = (state = initializeGame(5), action) => {
  const selectedReducer = roleReducer(state.turn, state.orderHalfMove);
  return selectedReducer(state, action);
};

export default gameReducer;
