import { createEngine, Roles } from '../engine/engine';
import { selectTurn, selectOrderHalfMove, selectLegalMoves } from '../selectors/gameSelector';
import { socket } from '../socket/socket';

// ─── Action types ──────────────────────────────────────────────────────────────

const ORDER_HALF_MOVE       = 'ORDER_HALF_MOVE';
const RESET_ORDER_HALF_MOVE = 'RESET_ORDER_HALF_MOVE';

// Socket-driven action types
const SOCKET_CONNECTED      = 'SOCKET_CONNECTED';
const SOCKET_DISCONNECTED   = 'SOCKET_DISCONNECTED';
const GAME_CREATED          = 'GAME_CREATED';
const GAME_JOINED           = 'GAME_JOINED';
const GAME_STARTED          = 'GAME_STARTED';
const MOVE_APPLIED          = 'MOVE_APPLIED';
const NEXT_PIECE            = 'NEXT_PIECE';
const ROUND_COMPLETE        = 'ROUND_COMPLETE';
const ROUND_ADVANCED        = 'ROUND_ADVANCED';
const GAME_OVER             = 'GAME_OVER';
const OPEN_GAMES_UPDATED    = 'OPEN_GAMES_UPDATED';
const PLAYER_DISCONNECTED   = 'PLAYER_DISCONNECTED';
const ERROR_RECEIVED        = 'ERROR_RECEIVED';

// ─── Socket listener setup ─────────────────────────────────────────────────────

/**
 * Wire all server-to-client socket events to Redux dispatch.
 * Call this once after creating the store, passing the socket singleton and dispatch.
 */
export const setupSocketListeners = (socketInstance, dispatch) => {
  socketInstance.on('connect',             ()      => dispatch({ type: SOCKET_CONNECTED }));
  socketInstance.on('disconnect',          ()      => dispatch({ type: SOCKET_DISCONNECTED }));
  socketInstance.on('GAME_CREATED',        payload => dispatch({ type: GAME_CREATED,        payload }));
  socketInstance.on('GAME_JOINED',         payload => dispatch({ type: GAME_JOINED,         payload }));
  socketInstance.on('GAME_STARTED',        payload => dispatch({ type: GAME_STARTED,        payload }));
  socketInstance.on('MOVE_APPLIED',        payload => dispatch({ type: MOVE_APPLIED,        payload }));
  socketInstance.on('NEXT_PIECE',          payload => dispatch({ type: NEXT_PIECE,          payload }));
  socketInstance.on('ROUND_COMPLETE',      payload => dispatch({ type: ROUND_COMPLETE,      payload }));
  socketInstance.on('ROUND_ADVANCED',      payload => dispatch({ type: ROUND_ADVANCED,      payload }));
  socketInstance.on('GAME_OVER',           payload => dispatch({ type: GAME_OVER,           payload }));
  socketInstance.on('OPEN_GAMES',          payload => dispatch({ type: OPEN_GAMES_UPDATED,  payload }));
  socketInstance.on('PLAYER_DISCONNECTED', payload => dispatch({ type: PLAYER_DISCONNECTED, payload }));
  socketInstance.on('ERROR',               payload => dispatch({ type: ERROR_RECEIVED,      payload }));
};

// ─── Internal helpers ──────────────────────────────────────────────────────────

function isValid(moves, move) {
  return moves.some(each => each.x === move.x && each.y === move.y);
}

function ensureConnected() {
  if (!socket.connected) {
    socket.connect();
  }
}

// ─── Thunks ───────────────────────────────────────────────────────────────────

/**
 * Create a new game on the server. Accepts the same options shape as before
 * so the NewGameDialog can call it unchanged.
 * Connects the socket first if needed, then emits CREATE_GAME.
 */
export const newGame = (options = {}) => (dispatch, getState) => {
  ensureConnected();

  const doCreate = () => {
    const state = getState();
    const storedName = state.config && state.config.player1Name;
    const playerName = options.player1Name
      || (storedName && storedName !== 'Player 1' ? storedName : null)
      || 'Player 1';

    socket.emit('CREATE_GAME', {
      playerName,
      boardSize: options.boardSize || 5,
      playVsAI: options.playAgainstAI !== false,   // default to AI
    });
  };

  if (socket.connected) {
    doCreate();
  } else {
    socket.once('connect', doCreate);
  }
};

/**
 * Join an existing game by join code.
 */
export const joinGame = (joinCode, playerName) => () => {
  ensureConnected();
  socket.emit('JOIN_GAME', { joinCode, playerName });
};

/**
 * Drag-and-drop / click-based move handler.
 * Emits the appropriate socket event based on the current turn.
 */
export const handleMovePiece = (toCoordinate = {}, fromCoordinate = {}) => (dispatch, getState) => {
  const state = getState();
  const turn = selectTurn(state);
  const legalMoves = selectLegalMoves(state);
  const { gameId } = state;

  if (turn === Roles.ORDER) {
    const legalEndMoves = legalMoves.map(move => move.end);
    if (isValid(legalEndMoves, toCoordinate)) {
      socket.emit('ORDER_MOVE', { gameId, start: fromCoordinate, end: toCoordinate });
    } else {
      dispatch({ type: RESET_ORDER_HALF_MOVE });
    }
  } else if (turn === Roles.CHAOS) {
    if (isValid(legalMoves, toCoordinate)) {
      socket.emit('CHAOS_MOVE', { gameId, x: toCoordinate.x, y: toCoordinate.y });
    }
  }
};

/**
 * Click-based move handler (tap to select + tap to place).
 */
export const handleClick = (x, y) => (dispatch, getState) => {
  const clickLocation = { x, y };
  const state = getState();
  const turn = selectTurn(state);
  const halfMove = selectOrderHalfMove(state);
  const legalMoves = selectLegalMoves(state);
  const { gameId } = state;

  if (turn === Roles.ORDER) {
    if (!halfMove) {
      const legalStartMoves = legalMoves.map(move => move.start);
      if (isValid(legalStartMoves, clickLocation)) {
        dispatch({ type: ORDER_HALF_MOVE, payload: clickLocation });
      }
    } else {
      const legalEndMoves = legalMoves.map(move => move.end);
      if (isValid(legalEndMoves, clickLocation)) {
        socket.emit('ORDER_MOVE', { gameId, start: state.orderHalfMove, end: clickLocation });
      } else {
        dispatch({ type: RESET_ORDER_HALF_MOVE });
      }
    }
  } else if (turn === Roles.CHAOS) {
    if (isValid(legalMoves, clickLocation)) {
      socket.emit('CHAOS_MOVE', { gameId, x: clickLocation.x, y: clickLocation.y });
    }
  }
};

/**
 * Order player passes their turn.
 */
export const handlePass = () => (dispatch, getState) => {
  const { gameId } = getState();
  socket.emit('ORDER_PASS', { gameId });
};

/**
 * Current player resigns.
 */
export const handleResign = () => (dispatch, getState) => {
  const { gameId } = getState();
  socket.emit('RESIGN', { gameId });
};

/**
 * Advance to the next round (called after the end-of-round screen).
 */
export const advanceRound = () => (dispatch, getState) => {
  const { gameId } = getState();
  socket.emit('ADVANCE_ROUND', { gameId });
};

/**
 * Fetch the list of open games waiting for an opponent.
 */
export const requestOpenGames = () => () => {
  socket.emit('GET_OPEN_GAMES');
};

/**
 * Request a full state sync from the server (reconnect / desync recovery).
 */
export const requestStateSync = (gameId) => () => {
  socket.emit('REQUEST_STATE', { gameId });
};

// ─── Initial state ─────────────────────────────────────────────────────────────

// Seed with a fresh engine state so all existing selectors (board, legalMoves,
// remainingPieces, etc.) have valid structure before the first GAME_STARTED arrives.
const _seed = createEngine();
_seed.newGame({ boardSize: 5 });

const initialState = {
  ..._seed.getState(),
  // Socket / lobby fields
  gameId: null,
  joinCode: null,
  myRole: null,
  connectionStatus: 'disconnected',
  lobbyGames: [],
  gameResult: null,
  serverError: null,
  waitingForOpponent: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

const gameReducer = (state = initialState, action) => {
  switch (action.type) {

    case SOCKET_CONNECTED:
      return { ...state, connectionStatus: 'connected', serverError: null };

    case SOCKET_DISCONNECTED:
      return { ...state, connectionStatus: 'disconnected' };

    // Server confirmed game was created; in VS-AI the game starts immediately
    // (GAME_STARTED follows). In H vs H we wait for a second player.
    case GAME_CREATED:
      return {
        ...state,
        gameId: action.payload.gameId,
        joinCode: action.payload.joinCode,
        waitingForOpponent: !action.payload.player2Name,
      };

    case GAME_JOINED:
      return {
        ...state,
        waitingForOpponent: false,
      };

    // Full initial state from the server — merges engine state + player/role metadata.
    case GAME_STARTED: {
      const { player1Name, player2Name, gameId, joinCode, myRole, seq, ...gameState } = action.payload;
      return {
        ...state,
        ...gameState,
        // Overlay player names into config so existing selectors (selectPlayer1Name etc.) work.
        config: {
          ...gameState.config,
          player1Name: player1Name || (gameState.config && gameState.config.player1Name),
          player2Name: player2Name || (gameState.config && gameState.config.player2Name),
        },
        gameId: gameId || state.gameId,
        joinCode: joinCode || state.joinCode,
        myRole: myRole || state.myRole,
        seq: seq || 0,
        orderHalfMove: undefined,
        resignedPlayer: undefined,
        gameResult: null,
        waitingForOpponent: false,
      };
    }

    // Incremental update after any move — board, turn, scores, remainingPieces.
    case MOVE_APPLIED: {
      const { seq, move: _move, ...gameState } = action.payload;
      return {
        ...state,
        ...gameState,
        seq,
        orderHalfMove: undefined,
      };
    }

    // Private piece update sent only to the current Chaos player.
    case NEXT_PIECE:
      return {
        ...state,
        nextPiece: action.payload.nextPiece,
        seq: action.payload.seq,
      };

    // ROUND_COMPLETE carries scores; the UI already knows because isEndOfRound
    // was included in the final MOVE_APPLIED. No reducer change needed.
    case ROUND_COMPLETE:
      return state;

    // Full state after advancing to round 2.
    case ROUND_ADVANCED: {
      const { seq, ...gameState } = action.payload;
      return {
        ...state,
        ...gameState,
        seq,
        orderHalfMove: undefined,
      };
    }

    // Game finished (normal end or resign).
    case GAME_OVER:
      return {
        ...state,
        gameResult: action.payload,
        // resignedPlayer drives selectIsGameOver + selectWinning in existing selectors.
        resignedPlayer: action.payload.resignedPlayer || undefined,
      };

    case OPEN_GAMES_UPDATED:
      return { ...state, lobbyGames: action.payload };

    case PLAYER_DISCONNECTED:
      return {
        ...state,
        serverError: `${action.payload.playerName} disconnected`,
      };

    case ERROR_RECEIVED:
      return { ...state, serverError: action.payload.message };

    // Local UI state for the two-click Order move interaction.
    case ORDER_HALF_MOVE:
      return { ...state, orderHalfMove: action.payload };

    case RESET_ORDER_HALF_MOVE:
      return { ...state, orderHalfMove: undefined };

    default:
      return state;
  }
};

export const entropyReducer = gameReducer;
