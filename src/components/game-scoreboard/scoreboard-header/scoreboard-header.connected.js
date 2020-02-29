import { connect } from 'react-redux';
import { selectScore, selectMoveNumber, selectRoundNumber } from '../../../selectors/gameSelector';
import { ScoreboardHeader } from './scoreboard-header';

export const mapStateToProps = state => {
  return {
    moveNumber: selectMoveNumber(state),
    roundNumber: selectRoundNumber(state),
    score: selectScore(state)
  };
};

const mapDispatchToProps = undefined;

export const ConnectedScoreboardHeader = connect(mapStateToProps, mapDispatchToProps)(ScoreboardHeader);
