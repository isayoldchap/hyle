import { ScoreboardCurrentMoveActionItem } from './scoreboard-current-move-action-item';
import { connect } from 'react-redux';
import {
  selectIsEndOfRound,
  selectIsGameOver,
  selectRoundNumber,
  selectTurn,
  selectWinning,
  selectNextTile,
  selectPlayer1Name,
  selectPlayer1Score,
  selectPlayer2Name,
  selectPlayer2Score
} from '../../../selectors/gameSelector';
import { advanceRound, newGame, handlePass } from '../../../ducks/entropyDuck';

export const mapStateToProps = state => {
  return {
    endOfGame: selectIsGameOver(state),
    endOfRound: selectIsEndOfRound(state),
    nextTile: selectNextTile(state),
    orderHalfMove: state.orderHalfMove,
    player1Name: selectPlayer1Name(state),
    player1Score: selectPlayer1Score(state),
    player2Name: selectPlayer2Name(state),
    player2Score: selectPlayer2Score(state),
    roundNumber: selectRoundNumber(state),
    turn: selectTurn(state),
    winner: selectWinning(state)
  };
};

const mapDispatchToProps = {
  pass: handlePass,
  startNewGame: newGame,
  startNextRound: advanceRound
};

export const ConnectedScoreboardCurrentMoveActionItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreboardCurrentMoveActionItem);
