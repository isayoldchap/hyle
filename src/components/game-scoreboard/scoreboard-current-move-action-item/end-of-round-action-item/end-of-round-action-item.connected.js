import { connect } from 'react-redux';
import { advanceRound } from '../../../../ducks/entropyDuck';
import { EndOfRoundActionItem } from './end-of-round-action-item';

export const mapStateToProps = undefined;

const mapDispatchToProps = {
  startNextRound: advanceRound
};

export const ConnectedEndOfRoundActionItem = connect(mapStateToProps, mapDispatchToProps)(EndOfRoundActionItem);
