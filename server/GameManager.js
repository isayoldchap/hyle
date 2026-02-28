const { v4: uuidv4 } = require('uuid');
const { GameRoom } = require('./GameRoom');

// Unambiguous charset — no 0/O/1/I confusion
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateJoinCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

class GameManager {
  constructor() {
    this.games = new Map(); // gameId → GameRoom
    this.codes = new Map(); // joinCode → gameId
  }

  createGame(config, socketId, playerName) {
    const gameId = uuidv4();
    let joinCode;
    // Ensure uniqueness (astronomically unlikely to collide but good practice)
    do {
      joinCode = generateJoinCode();
    } while (this.codes.has(joinCode));

    const room = new GameRoom(gameId, joinCode, config, socketId, playerName);
    this.games.set(gameId, room);
    this.codes.set(joinCode, gameId);
    return room;
  }

  getByCode(code) {
    const gameId = this.codes.get(code.toUpperCase());
    return gameId ? this.games.get(gameId) : undefined;
  }

  getById(gameId) {
    return this.games.get(gameId);
  }

  getOpenGames() {
    return Array.from(this.games.values()).filter(r => r.status === 'waiting');
  }

  remove(gameId) {
    const room = this.games.get(gameId);
    if (room) {
      this.codes.delete(room.joinCode);
      this.games.delete(gameId);
    }
  }
}

module.exports = { GameManager };
