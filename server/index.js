// Polyfill for async generators / regeneratorRuntime used in src/ utilities.
require('regenerator-runtime/runtime');

// Transpile ES module syntax in src/ at runtime (engine, AI, utils).
// This must happen before any require() that pulls from src/.
require('@babel/register')({
  presets: ['@babel/preset-env'],
  ignore: [/node_modules/],
});

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { GameManager } = require('./GameManager');

const PORT = process.env.PORT || 3001;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

const manager = new GameManager();

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Build the MOVE_APPLIED payload for broadcast to the whole room. */
function buildMovePayload(room, move) {
  const state = room.getState();
  return {
    seq: room.seq,
    move,
    board: state.board,
    turn: state.turn,
    round: state.round,
    legalMoves: state.legalMoves,
    player1Score: state.player1Score,
    player2Score: state.player2Score,
    remainingPieces: state.remainingPieces,
    remainingColorCounts: state.remainingColorCounts,
    moveNumber: state.moveNumber,
    isEndOfRound: room.isEndOfRound(),
    isGameOver: room.isGameOver(),
  };
}

/** Send MOVE_APPLIED to all players and watchers; send nextPiece only to Chaos. */
function broadcastMove(io, room, move) {
  const payload = buildMovePayload(room, move);
  io.to(room.gameId).emit('MOVE_APPLIED', payload);

  // Privately hand the next piece to whichever socket is Chaos
  if (!room.isEndOfRound() && !room.isGameOver()) {
    const chaosSocketId = room.getChaosSocketId();
    const { nextPiece } = room.getState();
    if (chaosSocketId && nextPiece) {
      io.to(chaosSocketId).emit('NEXT_PIECE', { nextPiece, seq: room.seq });
    }
  }

  if (room.isGameOver()) {
    io.to(room.gameId).emit('GAME_OVER', {
      winner: room.getWinner(),
      player1Score: room.getState().player1Score,
      player2Score: room.getState().player2Score,
    });
    room.status = 'complete';
  } else if (room.isEndOfRound()) {
    const state = room.getState();
    io.to(room.gameId).emit('ROUND_COMPLETE', {
      player1Score: state.player1Score,
      player2Score: state.player2Score,
      round: state.round,
    });
  }
}

/** Trigger AI move after a short delay (so it feels like the AI is thinking). */
function scheduleAIMove(io, room) {
  if (!room.isAITurn()) return;
  setTimeout(() => {
    try {
      const { move, state: _state } = room.applyAIMove();
      broadcastMove(io, room, move);
    } catch (err) {
      console.error(`AI move error in game ${room.gameId}:`, err);
    }
  }, 300);
}

// ─── Socket events ────────────────────────────────────────────────────────────

io.on('connection', socket => {
  console.log(`Socket connected: ${socket.id}`);

  // ── CREATE_GAME ────────────────────────────────────────────────────────────
  socket.on('CREATE_GAME', ({ playerName, boardSize = 5, playVsAI = false }) => {
    const config = { boardSize, playVsAI };
    const room = manager.createGame(config, socket.id, playerName);
    socket.join(room.gameId);

    if (playVsAI) {
      room.startVsAI();
      socket.emit('GAME_CREATED', {
        gameId: room.gameId,
        joinCode: room.joinCode,
        player1Name: room.player1.name,
        player2Name: room.player2.name,
      });
      // Send initial state — human is always player1 (Chaos R1)
      const state = room.getStateFor(socket.id);
      socket.emit('GAME_STARTED', {
        ...state,
        seq: room.seq,
        myRole: 'player1',
        gameId: room.gameId,
        joinCode: room.joinCode,
        player1Name: room.player1.name,
        player2Name: room.player2.name,
      });
    } else {
      socket.emit('GAME_CREATED', {
        gameId: room.gameId,
        joinCode: room.joinCode,
        player1Name: room.player1.name,
        player2Name: null,
      });
    }
  });

  // ── JOIN_GAME ──────────────────────────────────────────────────────────────
  socket.on('JOIN_GAME', ({ joinCode, playerName }) => {
    const room = manager.getByCode(joinCode);
    if (!room) {
      socket.emit('ERROR', { code: 'GAME_NOT_FOUND', message: `No game with code ${joinCode}` });
      return;
    }
    if (room.status !== 'waiting') {
      socket.emit('ERROR', { code: 'GAME_FULL', message: 'This game is already full' });
      return;
    }

    room.addPlayer2(socket.id, playerName);
    socket.join(room.gameId);

    // Tell both players the confirmed names (after role randomisation)
    io.to(room.gameId).emit('GAME_JOINED', {
      gameId: room.gameId,
      player1Name: room.player1.name,
      player2Name: room.player2.name,
    });

    // Send each player their personalised initial state
    io.to(room.player1.socketId).emit('GAME_STARTED', {
      ...room.getStateFor(room.player1.socketId),
      seq: room.seq,
      myRole: 'player1',
      gameId: room.gameId,
      joinCode: room.joinCode,
      player1Name: room.player1.name,
      player2Name: room.player2.name,
    });
    io.to(room.player2.socketId).emit('GAME_STARTED', {
      ...room.getStateFor(room.player2.socketId),
      seq: room.seq,
      myRole: 'player2',
      gameId: room.gameId,
      joinCode: room.joinCode,
      player1Name: room.player1.name,
      player2Name: room.player2.name,
    });
  });

  // ── WATCH_GAME ─────────────────────────────────────────────────────────────
  socket.on('WATCH_GAME', ({ joinCode }) => {
    const room = manager.getByCode(joinCode);
    if (!room) {
      socket.emit('ERROR', { code: 'GAME_NOT_FOUND', message: `No game with code ${joinCode}` });
      return;
    }
    room.watchers.add(socket.id);
    socket.join(room.gameId);
    // Watchers get state without nextPiece
    const state = room.getStateFor(null);
    socket.emit('GAME_STARTED', {
      ...state,
      seq: room.seq,
      myRole: 'watcher',
      gameId: room.gameId,
      joinCode: room.joinCode,
      player1Name: room.player1.name,
      player2Name: room.player2 ? room.player2.name : null,
    });
  });

  // ── GET_OPEN_GAMES ─────────────────────────────────────────────────────────
  socket.on('GET_OPEN_GAMES', () => {
    socket.emit('OPEN_GAMES', manager.getOpenGames().map(r => r.toLobbyEntry()));
  });

  // ── REQUEST_STATE (reconnect / desync recovery) ────────────────────────────
  socket.on('REQUEST_STATE', ({ gameId }) => {
    const room = manager.getById(gameId);
    if (!room) {
      socket.emit('ERROR', { code: 'GAME_NOT_FOUND', message: `Game ${gameId} not found` });
      return;
    }
    const state = room.getStateFor(socket.id);
    socket.emit('STATE_SYNC', { ...state, seq: room.seq });
  });

  // ── CHAOS_MOVE ─────────────────────────────────────────────────────────────
  socket.on('CHAOS_MOVE', ({ gameId, x, y }) => {
    const room = manager.getById(gameId);
    if (!room) { socket.emit('ERROR', { code: 'GAME_NOT_FOUND' }); return; }
    if (!room.isCurrentPlayer(socket.id)) { socket.emit('ERROR', { code: 'NOT_YOUR_TURN' }); return; }

    try {
      room.applyMove({ x, y });
      broadcastMove(io, room, { x, y });
      scheduleAIMove(io, room);
    } catch (err) {
      socket.emit('ERROR', { code: 'INVALID_MOVE', message: err.message });
    }
  });

  // ── ORDER_MOVE ─────────────────────────────────────────────────────────────
  socket.on('ORDER_MOVE', ({ gameId, start, end }) => {
    const room = manager.getById(gameId);
    if (!room) { socket.emit('ERROR', { code: 'GAME_NOT_FOUND' }); return; }
    if (!room.isCurrentPlayer(socket.id)) { socket.emit('ERROR', { code: 'NOT_YOUR_TURN' }); return; }

    try {
      room.applyMove({ start, end });
      broadcastMove(io, room, { start, end });
      scheduleAIMove(io, room);
    } catch (err) {
      socket.emit('ERROR', { code: 'INVALID_MOVE', message: err.message });
    }
  });

  // ── ORDER_PASS ─────────────────────────────────────────────────────────────
  socket.on('ORDER_PASS', ({ gameId }) => {
    const room = manager.getById(gameId);
    if (!room) { socket.emit('ERROR', { code: 'GAME_NOT_FOUND' }); return; }
    if (!room.isCurrentPlayer(socket.id)) { socket.emit('ERROR', { code: 'NOT_YOUR_TURN' }); return; }

    try {
      room.applyMove({ pass: true });
      broadcastMove(io, room, { pass: true });
      scheduleAIMove(io, room);
    } catch (err) {
      socket.emit('ERROR', { code: 'INVALID_MOVE', message: err.message });
    }
  });

  // ── ADVANCE_ROUND ──────────────────────────────────────────────────────────
  socket.on('ADVANCE_ROUND', ({ gameId }) => {
    const room = manager.getById(gameId);
    if (!room) { socket.emit('ERROR', { code: 'GAME_NOT_FOUND' }); return; }
    if (!room.isEndOfRound()) { socket.emit('ERROR', { code: 'ROUND_NOT_COMPLETE' }); return; }

    const state = room.advanceRound();
    io.to(gameId).emit('ROUND_ADVANCED', {
      seq: room.seq,
      board: state.board,
      turn: state.turn,
      round: state.round,
      legalMoves: state.legalMoves,
      player1Score: state.player1Score,
      player2Score: state.player2Score,
      remainingPieces: state.remainingPieces,
      remainingColorCounts: state.remainingColorCounts,
      moveNumber: state.moveNumber,
    });

    // Send new nextPiece to the (new) Chaos player
    const chaosSocketId = room.getChaosSocketId();
    if (chaosSocketId && state.nextPiece) {
      io.to(chaosSocketId).emit('NEXT_PIECE', { nextPiece: state.nextPiece, seq: room.seq });
    }

    // If AI goes first in round 2
    scheduleAIMove(io, room);
  });

  // ── RESIGN ────────────────────────────────────────────────────────────────
  socket.on('RESIGN', ({ gameId }) => {
    const room = manager.getById(gameId);
    if (!room) { socket.emit('ERROR', { code: 'GAME_NOT_FOUND' }); return; }

    const resigningName =
      room.player1.socketId === socket.id
        ? room.player1.name
        : (room.player2 && room.player2.name);

    room.status = 'complete';
    io.to(gameId).emit('GAME_OVER', {
      winner: resigningName === room.player1.name
        ? (room.player2 && room.player2.name)
        : room.player1.name,
      resignedPlayer: resigningName,
      player1Score: room.getState().player1Score,
      player2Score: room.getState().player2Score,
    });
  });

  // ── DISCONNECT ─────────────────────────────────────────────────────────────
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    // Notify the other player; don't destroy the game — allow reconnection
    manager.games.forEach(room => {
      const p1Match = room.player1 && room.player1.socketId === socket.id;
      const p2Match = room.player2 && room.player2.socketId === socket.id;
      if (p1Match || p2Match) {
        const disconnectedName = p1Match ? room.player1.name : room.player2.name;
        socket.to(room.gameId).emit('PLAYER_DISCONNECTED', { playerName: disconnectedName });
      }
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Entropy server listening on port ${PORT}`);
});
