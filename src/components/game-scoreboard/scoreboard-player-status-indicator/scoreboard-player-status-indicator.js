import React from 'react';
import PropTypes from 'prop-types';

export const ScoreboardPlayerStatusIndicator = props => {
  const { isChaos, isCurrentTurn, playerName, playerScore } = props;

  const cardStyle = {
    background: isCurrentTurn ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.3)',
    border: `1px solid ${isCurrentTurn ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.06)'}`,
    borderRadius: '10px',
    boxShadow: isCurrentTurn ? '0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.4)' : 'none',
    flex: 2,
    opacity: isCurrentTurn ? 1 : 0.45,
    overflow: 'hidden',
    transition: 'opacity 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
  };

  const roleColor = isChaos ? '#72bf44' : '#e05c5c';

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div style={{
          flex: 1,
          padding: '0.6rem 0.75rem',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.55rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            marginBottom: '0.2rem',
            textTransform: 'uppercase'
          }}>
            Player
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>{playerName}</div>
        </div>
        <div style={{ flex: 1, padding: '0.6rem 0.75rem' }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.55rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            marginBottom: '0.2rem',
            textTransform: 'uppercase'
          }}>
            Score
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>{playerScore}</div>
        </div>
      </div>

      <div style={{ padding: '0.4rem 0.75rem 0.5rem' }}>
        <span style={{
          color: roleColor,
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          {isChaos ? 'Chaos' : 'Order'}
        </span>
        <span style={{
          color: 'rgba(255, 255, 255, 0.35)',
          fontSize: '0.62rem',
          marginLeft: '0.4rem',
        }}>
          {isChaos ? 'Place the next piece' : 'Make a move or pass'}
        </span>
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
