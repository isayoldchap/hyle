import {
  placeTile,
  moveTile,
  emptySquaresSelector,
  allLegalMovesFromLocation
} from "../ducks/boardDuck";

import {initializeEntropyBoard} from "../entropy";
import { selectNextTile, selectBoardSize } from "../selectors/gameSelector";
import generateGamePieceSequence from "../util/SequenceGenerator";
import { HistoryActionTypes } from "../actioncreators/historyActions";
import { BoardActionTypes } from "../actioncreators/boardActions";
import { GameActionTypes } from "../actioncreators/gameActions";

export const Roles = {
  Chaos: "chaos",
  Order: "order"
};

export const ALL_COLORS = [
  "Red",
  "Green",
  "Orange",
  "Blue",
  "Magenta",
  "Cyan",
  "Brown",
  "Silver",
  "Gray",
  "Yellow",
  "Navy",
  "Black"
];

const INITIAL_GAME_STATE = Object.freeze({
  roundNumber: 1,
  moveNumber: 1,
  turn: Roles.Chaos,
  player1: {
    role: Roles.Chaos,
    name: "Player 1"
  },
  player2: {
    role: Roles.Order,
    name: "Player 2"
  }
});

const newGameReducer = (state, action) => {
  if (action.type !== GameActionTypes.NEW_GAME) {
    return state;
  }

  const gameOptions = action.payload;
  const boardSize = gameOptions.boardSize;
  return Object.assign(
    {},
    state,
    initializeGame(INITIAL_GAME_STATE, boardSize)
  );
};

const nextRoundReducer = (state, action) => {
  if (action.type !== GameActionTypes.NEXT_ROUND) {
    return state;
  }

  const newRoundNumber = state.roundNumber + 1;

  return Object.assign({}, state, initializeGame(state, selectBoardSize(state)), {
    moveNumber: 1,
    roundNumber: newRoundNumber,
    turn: Roles.Chaos
  });
};

const initializeGame = (gameState, boardSize) => {
  const initialBoard = initializeEntropyBoard(boardSize);
  const colors = ALL_COLORS.slice(0, boardSize);
  const pieceSequence = generateGamePieceSequence(colors);

  const newState = {
    ...gameState,
    remainingPieces: pieceSequence,
    colors: colors,
    board: initialBoard
  };

  return newState;
};

const chaosReducer = (state, action) => {
  switch (action.type) {
    case BoardActionTypes.SQUARE_CLICKED:
      const emptySquares = emptySquaresSelector(state);
      const matchingSquare = emptySquares.find(square => {
        return (
          square.row === action.payload.y && square.col === action.payload.x
        );
      });

      if (!matchingSquare) return state;

      const nextColor = selectNextTile(state);
      const updatedBoard = placeTile(
        state,
        matchingSquare.row,
        matchingSquare.col,
        nextColor
      );
      const newState = Object.assign(
        {},
        state,
        { board: updatedBoard },
        { turn: Roles.Order },
        { remainingPieces: state.remainingPieces.slice(1) }
      );
      return newState;
    default:
      return state;
  }
};

const handlePassAction = state => {
  return Object.assign({}, state, {
    turn: Roles.Chaos,
    orderHalfMove: undefined,
    moveNumber: state.moveNumber + 1
  });
}

const orderStartMoveReducer = (state, action) => {
  switch (action.type) {
    case BoardActionTypes.SQUARE_CLICKED:
      const legalOrderMoves = allLegalMovesFromLocation(state, action.payload);
      if (legalOrderMoves.length > 0) {
        const halfMove = action.payload;
        return Object.assign({}, state, { orderHalfMove: halfMove });
      } else return state;
    case BoardActionTypes.PASS:
      return handlePassAction(state);
    default:
      return state;
  }
};

const orderEndMoveReducer = (state, action) => {
  switch (action.type) {
    case BoardActionTypes.SQUARE_CLICKED:
      const startMove = state.orderHalfMove;
      const endMove = action.payload;
      const legalMoves = allLegalMovesFromLocation(state, startMove);
      const foundMove = legalMoves.find(move => {
        return move.end.x === endMove.x && move.end.y === endMove.y;
      });
      if (foundMove === undefined) {
        return Object.assign({}, state, { orderHalfMove: undefined });
      } else {
        const updatedBoard = moveTile(state, startMove, endMove);
        return Object.assign(
          {},
          state,
          { board: updatedBoard },
          { turn: Roles.Chaos },
          { orderHalfMove: undefined },
          { moveNumber: state.moveNumber + 1 }
        );
      }
    case BoardActionTypes.PASS:
      return handlePassAction(state);
    default:
      return state;
  }
};

const roleReducer = (role, orderHalfMove) => {
  if (role === Roles.Chaos) return chaosReducer;
  else if (orderHalfMove === undefined) return orderStartMoveReducer;
  else return orderEndMoveReducer;
};

const calcNewStateReducer = (
  state = initializeGame(INITIAL_GAME_STATE, 5),
  action
) => {
  switch (action.type) {
    case GameActionTypes.NEW_GAME:
      return newGameReducer(state, action);
    case GameActionTypes.NEXT_ROUND:
      return nextRoundReducer(state, action);
    default:
      const selectedReducer = roleReducer(state.turn, state.orderHalfMove);
      return selectedReducer(state, action);
  }
};

const withHistory = reducer => (state, action) => {
  const oldState = state || {};

  if (action.type === HistoryActionTypes.BACK) {
    const stateHistory = oldState.history || [];
    if (stateHistory.length === 1) {
      return oldState;
    }

    const previousState = stateHistory[stateHistory.length - 1];
    return previousState;
  }

  const newState = reducer(state, action);

  if (state === newState) return state;

  const previousHistory = oldState.history || [];
  const stateWithHistory = Object.assign({}, newState, {
    history: previousHistory.concat(oldState)
  });

  return stateWithHistory;
};

const gameReducer = withHistory(calcNewStateReducer);

export default gameReducer;
