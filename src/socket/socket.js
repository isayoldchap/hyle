import io from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';

// autoConnect: false — we connect explicitly when the user enters the lobby.
export const socket = io(SERVER_URL, { autoConnect: false });
