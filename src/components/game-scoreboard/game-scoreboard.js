import React from 'react';
import PropType from 'prop-types';
import { ConnectedScoreboardHeader } from './scoreboard-header/scoreboard-header.connected';
import { ConnectedScoreboardCurrentTurn } from './scoreboard-current-turn/scoreboard-current-turn.connected';

export const GameScoreboard = props => {
  const { cellSize } = props;
  return (
    <React.Fragment>
      <ConnectedScoreboardHeader />
      <ConnectedScoreboardCurrentTurn cellSize={cellSize} />
    </React.Fragment>
  );
};

GameScoreboard.propTypes = {
  cellSize: PropType.number
};

GameScoreboard.defaultProps = {
  cellSize: null
};
