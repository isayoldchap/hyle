import React from 'react';
import PropTypes from 'prop-types';
import { Roles } from '../../../engine/engine';
import { ScoreboardPlayerStatusIndicator } from '../scoreboard-player-status-indicator/scoreboard-player-status-indicator';
import { ConnectedScoreboardCurrentMoveActionItem } from '../scoreboard-current-move-action-item/scoreboard-current-move-action-item.connected';

export const ScoreboardCurrentTurn = props => {
  const { cellSize, player1Name, player1Score, player2Name, player2Score, roundNumber, turn, width } = props;

  const currentTurnIsChaos = turn === Roles.CHAOS;

  const player1IsCurrentChaos = roundNumber % 2 !== 0;
  const player2IsCurrentChaos = !player1IsCurrentChaos;

  const isPlayer1Turn =
    (player1IsCurrentChaos && currentTurnIsChaos) || (!player1IsCurrentChaos && !currentTurnIsChaos);
  const isPlayer2Turn = !isPlayer1Turn;

  return (
    <div style={{ width, maxWidth: width, margin: '0 auto 1rem' }}>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <ScoreboardPlayerStatusIndicator
            playerName={player1Name}
            playerScore={player1Score}
            isChaos={player1IsCurrentChaos}
            isCurrentTurn={isPlayer1Turn}
          />
        </div>

        <div>
          <ConnectedScoreboardCurrentMoveActionItem cellSize={cellSize} />
        </div>

        <div style={{ flex: 1 }}>
          <ScoreboardPlayerStatusIndicator
            playerName={player2Name}
            playerScore={player2Score}
            isChaos={player2IsCurrentChaos}
            isCurrentTurn={isPlayer2Turn}
          />
        </div>
      </div>
    </div>
  );
};

ScoreboardCurrentTurn.propTypes = {
  cellSize: PropTypes.number,
  player1Name: PropTypes.string,
  player1Score: PropTypes.number,
  player2Name: PropTypes.string,
  player2Score: PropTypes.number,
  roundNumber: PropTypes.number,
  turn: PropTypes.string,
  width: PropTypes.number
};

ScoreboardCurrentTurn.defaultProps = {
  cellSize: null,
  player1Name: null,
  player1Score: null,
  player2Name: null,
  player2Score: null,
  roundNumber: null,
  turn: null,
  width: null
};
