import { connect } from 'react-redux';
import { selectScore, selectMoveNumber, selectRoundNumber } from '../../selectors/gameSelector';
import { GameScoreboard } from './game-scoreboard';

export const mapStateToProps = state => {
  return {
    moveNumber: selectMoveNumber(state),
    roundNumber: selectRoundNumber(state),
    score: selectScore(state)
  };
};

const mapDispatchToProps = {};

export const ConnectedGameScoreboard = connect(mapStateToProps, mapDispatchToProps)(GameScoreboard);
