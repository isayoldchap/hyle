// NOTE: server/index.js calls require('@babel/register') before requiring this file,
// so ES module syntax in src/ is transparently transpiled at runtime.
const { createEngine, Roles } = require('../src/engine/engine');
const { getAIMove } = require('../src/ai/aiOrchestrator');
const {
  selectIsEndOfRound,
  selectIsGameOver,
  selectWinning,
} = require('../src/selectors/gameSelector');

class GameRoom {
  constructor(gameId, joinCode, config, creatorSocketId, creatorName) {
    this.gameId = gameId;
    this.joinCode = joinCode;
    this.config = config;
    this.status = 'waiting'; // waiting | playing | complete
    this.seq = 0;
    this.watchers = new Set();

    // player1 = Chaos in Round 1 / Order in Round 2
    // player2 = Order in Round 1 / Chaos in Round 2
    // For VS-AI games, creator is always player1.
    // For H vs H, roles are randomised when the second player joins.
    this.player1 = { socketId: creatorSocketId, name: creatorName, isAI: false };
    this.player2 = null;

    this.engine = createEngine();
  }

  // ─── H vs AI ──────────────────────────────────────────────────────────────

  startVsAI() {
    this.player2 = { socketId: null, name: 'AI', isAI: true };
    this.status = 'playing';
    this.engine.newGame(this.config);
    return this;
  }

  // ─── H vs H ───────────────────────────────────────────────────────────────

  addPlayer2(socketId, playerName) {
    if (this.status !== 'waiting') throw new Error('Game not open for joining');

    // Randomise roles
    if (Math.random() < 0.5) {
      // Swap: joiner becomes player1 (Chaos R1), creator becomes player2
      this.player2 = { ...this.player1, isAI: false };
      this.player1 = { socketId, name: playerName, isAI: false };
    } else {
      this.player2 = { socketId, name: playerName, isAI: false };
    }

    this.status = 'playing';
    this.engine.newGame(this.config);
    return this;
  }

  // ─── Move handling ────────────────────────────────────────────────────────

  applyMove(move) {
    this.engine.playMove(move);
    this.seq += 1;
    return this.engine.getState();
  }

  applyAIMove() {
    const state = this.engine.getState();
    const { board, turn, nextPiece, remainingPieces } = state;
    // nextPiece is undefined during Order's turn — fall back to remainingPieces[0]
    const piece = nextPiece !== undefined ? nextPiece : (remainingPieces && remainingPieces[0]);
    const move = getAIMove(board, turn, piece);

    let engineMove;
    if (move.pass) {
      engineMove = { pass: true };
    } else if (move.cell) {
      engineMove = move.cell; // { x, y }
    } else {
      engineMove = { start: move.start, end: move.end };
    }

    this.engine.playMove(engineMove);
    this.seq += 1;
    return { move: engineMove, state: this.engine.getState() };
  }

  advanceRound() {
    this.engine.advanceRound();
    this.seq += 1;
    return this.engine.getState();
  }

  // ─── State accessors ─────────────────────────────────────────────────────

  getState() {
    return this.engine.getState();
  }

  /**
   * Returns the full game state suitable for sending to a specific socket.
   * nextPiece is redacted for non-Chaos players.
   */
  getStateFor(socketId) {
    const state = this.engine.getState();
    const isChaosPlayer = socketId === this.getChaosSocketId();
    if (!isChaosPlayer) {
      return { ...state, nextPiece: undefined };
    }
    return state;
  }

  isEndOfRound() {
    return selectIsEndOfRound(this.engine.getState());
  }

  isGameOver() {
    return selectIsGameOver(this.engine.getState());
  }

  getWinner() {
    return selectWinning(this.engine.getState());
  }

  // ─── Turn / role helpers ─────────────────────────────────────────────────

  /** Returns the socketId of whichever player is currently Chaos. */
  getChaosSocketId() {
    const { round } = this.engine.getState();
    // Round 1: player1 = Chaos. Round 2: player2 = Chaos.
    const chaosPlayer = round === 1 ? this.player1 : this.player2;
    return chaosPlayer ? chaosPlayer.socketId : null;
  }

  /** Returns true if it is currently the AI's turn. */
  isAITurn() {
    const state = this.engine.getState();
    const { turn, round } = state;
    // AI is always player2
    if (!this.player2 || !this.player2.isAI) return false;
    // Round 1: player2 = Order. Round 2: player2 = Chaos.
    return (round === 1 && turn === Roles.ORDER) || (round === 2 && turn === Roles.CHAOS);
  }

  /** Returns true if the given socket is the current player whose turn it is. */
  isCurrentPlayer(socketId) {
    const { turn, round } = this.engine.getState();
    // Determine which player's turn it is
    const isPlayer1Turn =
      (round === 1 && turn === Roles.CHAOS) || (round === 2 && turn === Roles.ORDER);
    const currentPlayer = isPlayer1Turn ? this.player1 : this.player2;
    return currentPlayer ? currentPlayer.socketId === socketId : false;
  }

  getOtherSocketId(socketId) {
    if (this.player1 && this.player1.socketId === socketId) {
      return this.player2 ? this.player2.socketId : null;
    }
    return this.player1 ? this.player1.socketId : null;
  }

  toLobbyEntry() {
    return {
      gameId: this.gameId,
      joinCode: this.joinCode,
      creatorName: this.player1.name,
      boardSize: this.config.boardSize || 5,
    };
  }
}

module.exports = { GameRoom };
