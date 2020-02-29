import { connect } from 'react-redux';
import {
  selectRoundNumber,
  selectTurn,
  selectPlayer1Name,
  selectPlayer1Score,
  selectPlayer2Name,
  selectPlayer2Score
} from '../../../selectors/gameSelector';
import { advanceRound, newGame, handlePass } from '../../../ducks/entropyDuck';
import { ScoreboardCurrentTurn } from './scoreboard-current-turn';

export const mapStateToProps = state => {
  return {
    player1Name: selectPlayer1Name(state),
    player1Score: selectPlayer1Score(state),
    player2Name: selectPlayer2Name(state),
    player2Score: selectPlayer2Score(state),
    roundNumber: selectRoundNumber(state),
    turn: selectTurn(state)
  };
};

const mapDispatchToProps = {
  pass: handlePass,
  startNewGame: newGame,
  startNextRound: advanceRound
};

export const ConnectedScoreboardCurrentTurn = connect(mapStateToProps, mapDispatchToProps)(ScoreboardCurrentTurn);
