export const GameActionTypes = Object.freeze({
  NEW_GAME: "newGame",
  NEXT_ROUND: "nextRound",
  PAUSE_GAME: "pauseGame",
  QUIT_GAME: "quitGame"
});

const DefaultGameOptions = Object.freeze({
  boardSize: 5,
  liveScore: true,
  showNextComponent: true,
  allowPass: true,
  player1: "Player 1",
  player2: "Player 2"
});

export const newGame = gameOptions => ({
  type: GameActionTypes.NEW_GAME,
  payload: Object.assign({}, DefaultGameOptions, gameOptions)
});

export const nextRound = () => ({
  type: GameActionTypes.NEXT_ROUND,
  payload: {}
});
