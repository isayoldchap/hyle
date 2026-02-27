import { connect } from 'react-redux';
import { selectWinning, selectConfig } from '../../../../selectors/gameSelector';
import { newGame } from '../../../../ducks/entropyDuck';
import { EndOfGameActionItem } from './end-of-game-action-item';

export const mapStateToProps = state => {
  const config = selectConfig(state);
  const aiConfig = state.aiConfig || {};
  return {
    winner: selectWinning(state),
    previousConfig: {
      boardSize: config.boardSize,
      showLiveScore: config.showLiveScore,
      showGridLines: config.showGridLines,
      playAgainstAI: !!aiConfig.player2IsAI
    }
  };
};

const mapDispatchToProps = {
  startNewGame: newGame
};

export const ConnectedEndOfGameActionItem = connect(mapStateToProps, mapDispatchToProps)(EndOfGameActionItem);
