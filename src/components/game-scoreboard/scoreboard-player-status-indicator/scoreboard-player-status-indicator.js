import React from 'react';
import PropTypes from 'prop-types';

export const ScoreboardPlayerStatusIndicator = props => {
  const { isChaos, isCurrentTurn, playerName, playerScore } = props;

  const wrapperStyle = isCurrentTurn
    ? { background: 'rgba(255,255,255,0.15)', opacity: 1, cursor: 'not-allowed' }
    : { background: 'rgba(0,0,0,0.5)', opacity: 0.35 };

  return (
    <div
      style={{
        border: '1px solid rgba(0,0,0,0.5)',
        borderRadius: 5,
        flex: 2,
        padding: '1rem',
        textAlign: 'center',
        ...wrapperStyle
      }}
    >
      {/* TODO: Turn this into a component: */}
      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.25)' }}>
        <div style={{ flex: 1, border: '1px solid #bbb', borderRight: 0 }}>
          <h3>{playerName}</h3>
        </div>
        <div style={{ flex: 1, border: '1px solid #bbb' }}>
          <h3>{playerScore}</h3>
        </div>
      </div>

      <div>
        {isChaos ? (
          // TODO: Turn this into a component:
          <h4 style={{ marginTop: '.5rem' }}>
            CHAOS <small style={{ fontWeight: 200 }}>Place the next piece</small>
          </h4>
        ) : (
          <h4 style={{ marginTop: '.5rem' }}>
            ORDER <small style={{ fontWeight: 200 }}>Make a move or pass</small>
          </h4>
        )}
      </div>
    </div>
  );
};

ScoreboardPlayerStatusIndicator.propTypes = {
  isChaos: PropTypes.bool,
  isCurrentTurn: PropTypes.bool,
  playerName: PropTypes.string,
  playerScore: PropTypes.number
};

ScoreboardPlayerStatusIndicator.defaultProps = {
  isChaos: false,
  isCurrentTurn: false,
  playerName: null,
  playerScore: null
};
