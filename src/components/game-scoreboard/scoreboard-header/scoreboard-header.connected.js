import { connect } from 'react-redux';
import { selectMoveNumber, selectRoundNumber } from '../../../selectors/gameSelector';
import { ScoreboardHeader } from './scoreboard-header';

export const mapStateToProps = state => {
  return {
    moveNumber: selectMoveNumber(state),
    roundNumber: selectRoundNumber(state)
  };
};

const mapDispatchToProps = undefined;

export const ConnectedScoreboardHeader = connect(mapStateToProps, mapDispatchToProps)(ScoreboardHeader);
