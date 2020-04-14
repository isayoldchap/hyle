import React from 'react';
import PropTypes from 'prop-types';

export const EndOfGameActionItem = props => {
  const { startNewGame, winner } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '.5rem' }}>
        Game Over!
        <br />
        {winner} won!
      </p>
      <button
        type="button"
        onClick={startNewGame}
        style={{
          background: 'lightCoral',
          textTransform: 'uppercase',
          fontWeight: 200,
          fontSize: '.8rem',
          border: 'none',
          borderRadius: 3,
          color: 'white',
          display: 'flex',
          flex: 1,
          margin: '0 1rem',
          padding: '.5rem 1rem',
          cursor: 'pointer'
        }}
      >
        <span style={{ flex: 1, alignSelf: 'center' }}>Play Again</span>
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
