import { ScoreboardCurrentMoveActionItem } from './scoreboard-current-move-action-item';
import { connect } from 'react-redux';
import { selectIsEndOfRound, selectIsGameOver, selectNextTile, selectTurn } from '../../../selectors/gameSelector';
import { handlePass } from '../../../ducks/entropyDuck';

export const mapStateToProps = state => {
  return {
    endOfGame: selectIsGameOver(state),
    endOfRound: selectIsEndOfRound(state),
    nextTile: selectNextTile(state),
    turn: selectTurn(state)
  };
};

const mapDispatchToProps = {
  pass: handlePass
};

export const ConnectedScoreboardCurrentMoveActionItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreboardCurrentMoveActionItem);
