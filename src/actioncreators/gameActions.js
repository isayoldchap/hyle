export const GameActionTypes = {
  NEW_GAME : "newGame",
  PAUSE_GAME : "pauseGame",
  QUIT_GAME : "quitGame"
};

const DefaultGameOptions = {
  boardSize: 5,
  liveScore: true,
  showNextComponent: true,
  allowPass: true,
  player1: "Player 1",
  player2: "Player 2"
};

export const newGame = (gameOptions) => ({
    type: GameActionTypes.NEW_GAME,
    payload: Object.assign({}, DefaultGameOptions, gameOptions)
});
