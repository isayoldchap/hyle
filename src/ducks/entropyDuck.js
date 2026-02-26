import { createEngine, Roles } from '../engine/engine';
import { selectTurn, selectOrderHalfMove, selectLegalMoves, selectIsEndOfRound, selectIsGameOver } from '../selectors/gameSelector';
import { isAITurn, getAIMove } from '../ai/aiOrchestrator';

const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
const ORDER_HALF_MOVE = 'ORDER_HALF_MOVE';
const RESET_ORDER_HALF_MOVE = 'RESET_ORDER_HALF_MOVE';
const SET_AI_CONFIG = 'SET_AI_CONFIG';

const engine = createEngine();

export const triggerAIMove = () => (dispatch, getState) => {
  const state = getState();
  if (selectIsEndOfRound(state) || selectIsGameOver(state)) return;
  if (!isAITurn(state)) return;

  setTimeout(() => {
    const currentState = getState();
    if (selectIsEndOfRound(currentState) || selectIsGameOver(currentState)) return;

    const { board, turn, nextPiece } = currentState;
    const move = getAIMove(board, turn, nextPiece);

    if (move.pass) {
      dispatch(handlePass());
    } else if (move.cell) {
      dispatch(handleMovePiece(move.cell));
    } else {
      dispatch(handleMovePiece(move.end, move.start));
    }
  }, 600);
};

export const newGame = options => dispatch => {
  engine.newGame(options);
  dispatch({ type: UPDATE_GAME_STATE, payload: engine.getState() });
  dispatch({ type: SET_AI_CONFIG, payload: { player2IsAI: !!options.playAgainstAI } });
  dispatch(triggerAIMove());
};

export const advanceRound = () => dispatch => {
  engine.advanceRound();
  dispatch({ type: UPDATE_GAME_STATE, payload: engine.getState() });
  dispatch(triggerAIMove());
};

export const handlePass = () => (dispatch, getState) => {
  if (selectIsEndOfRound(getState())) return;
  engine.playMove({ pass: true });
  const updatedState = engine.getState();
  dispatch({ type: UPDATE_GAME_STATE, payload: updatedState });
  dispatch(triggerAIMove());
};

function isValid(moves, move) {
  return moves.some(each => each.x === move.x && each.y === move.y);
}

export const handleMovePiece = (toCoordinate = {}, fromCoordinate = {}) => (dispatch, getState) => {
  function playMove(eng, move) {
    eng.playMove(move);
    const updatedState = eng.getState();
    dispatch({ type: UPDATE_GAME_STATE, payload: updatedState });
    dispatch(triggerAIMove());
  }

  const state = getState();
  const turn = selectTurn(state);
  const legalMoves = selectLegalMoves(state);
  if (turn === Roles.ORDER) {
    const legalEndMoves = legalMoves.map(move => move.end);
    if (isValid(legalEndMoves, toCoordinate)) {
      playMove(engine, { start: fromCoordinate, end: toCoordinate });
    } else {
      dispatch({ type: RESET_ORDER_HALF_MOVE, payload: toCoordinate });
    }
  } else if (turn === Roles.CHAOS) {
    if (isValid(legalMoves, toCoordinate)) {
      playMove(engine, toCoordinate);
    }
  }
};

export const handleClick = (x, y) => (dispatch, getState) => {
  function playMove(eng, move) {
    eng.playMove(move);
    const updatedState = eng.getState();
    dispatch({ type: UPDATE_GAME_STATE, payload: updatedState });
    dispatch(triggerAIMove());
  }

  const clickLocation = { x, y };
  const state = getState();
  const turn = selectTurn(state);
  const halfMove = selectOrderHalfMove(state);
  const legalMoves = selectLegalMoves(state);

  if (turn === 'Order') {
    if (!halfMove) {
      const legalStartMoves = legalMoves.map(move => move.start);
      if (isValid(legalStartMoves, clickLocation)) {
        dispatch({ type: ORDER_HALF_MOVE, payload: clickLocation });
      }
    } else {
      const legalEndMoves = legalMoves.map(move => move.end);
      if (isValid(legalEndMoves, clickLocation)) {
        playMove(engine, { start: state.orderHalfMove, end: clickLocation });
      } else {
        dispatch({ type: RESET_ORDER_HALF_MOVE, payload: clickLocation });
      }
    }
  } else if (turn === 'Chaos') {
    if (isValid(legalMoves, clickLocation)) {
      playMove(engine, clickLocation);
    }
  }
};

const initialState = {
  ...engine.getState(),
  aiConfig: { player1IsAI: false, player2IsAI: false }
};

const gameReducer = (state = initialState, action) => {
  const actionType = action.type;

  if (actionType === UPDATE_GAME_STATE) {
    return {
      ...state,
      ...action.payload,
      orderHalfMove: undefined
    };
  } else if (actionType === ORDER_HALF_MOVE) {
    return {
      ...state,
      orderHalfMove: action.payload
    };
  } else if (actionType === RESET_ORDER_HALF_MOVE) {
    return {
      ...state,
      orderHalfMove: undefined
    };
  } else if (actionType === SET_AI_CONFIG) {
    return {
      ...state,
      aiConfig: action.payload
    };
  }

  return state;
};

export const entropyReducer = gameReducer;
