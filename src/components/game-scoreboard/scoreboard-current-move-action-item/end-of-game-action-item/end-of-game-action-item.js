import React from 'react';
import PropTypes from 'prop-types';

export const EndOfGameActionItem = props => {
  const { startNewGame, winner } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '0.2rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
        Game Over
      </p>
      <p style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
        {winner} won!
      </p>
      <button type="button" onClick={startNewGame} className="btn">
        Play Again
      </button>
    </div>
  );
};

EndOfGameActionItem.propTypes = {
  startNewGame: PropTypes.func,
  winner: PropTypes.string
};

EndOfGameActionItem.defaultProps = {
  startNewGame: () => {},
  winner: null
};
