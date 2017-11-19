const roundsSelector = (state) => return state.rounds;

export const numberOfGames = (state) => {
  return roundsSelector.length;
}

export const currentRound = (state) => {
  const roundState = roundsSelector(state);

}

export const scoreForRound = (roundNumber) => {

}
