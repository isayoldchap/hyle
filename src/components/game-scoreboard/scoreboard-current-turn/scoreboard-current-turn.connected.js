import { connect } from 'react-redux';
import {
  selectPlayer1Name,
  selectPlayer1Score,
  selectPlayer2Name,
  selectPlayer2Score,
  selectRoundNumber,
  selectTurn
} from '../../../selectors/gameSelector';
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

export const ConnectedScoreboardCurrentTurn = connect(mapStateToProps)(ScoreboardCurrentTurn);
