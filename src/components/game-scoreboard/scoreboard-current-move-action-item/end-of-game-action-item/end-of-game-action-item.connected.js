import { connect } from 'react-redux';
import { selectWinning } from '../../../../selectors/gameSelector';
import { newGame } from '../../../../ducks/entropyDuck';
import { EndOfGameActionItem } from './end-of-game-action-item';

export const mapStateToProps = state => {
  return {
    winner: selectWinning(state)
  };
};

const mapDispatchToProps = {
  startNewGame: newGame
};

export const ConnectedEndOfGameActionItem = connect(mapStateToProps, mapDispatchToProps)(EndOfGameActionItem);
