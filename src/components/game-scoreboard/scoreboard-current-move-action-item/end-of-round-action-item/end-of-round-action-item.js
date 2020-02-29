import React from 'react';
import PropTypes from 'prop-types';

export const EndOfRoundActionItem = props => {
  const { startNextRound } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '.5rem' }}>End of Round</p>
      <button
        type="button"
        onClick={startNextRound}
        style={{
          background: 'lightCoral',
          border: 'none',
          borderRadius: 3,
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          flex: 1,
          fontSize: '.8rem',
          fontWeight: 200,
          margin: '0 1rem',
          padding: '.5rem 1rem',
          textTransform: 'uppercase'
        }}
      >
        <span style={{ flex: 1, alignSelf: 'center' }}>Continue</span>
      </button>
    </div>
  );
};

EndOfRoundActionItem.propTypes = {
  startNextRound: PropTypes.func
};

EndOfRoundActionItem.defaultProps = {
  startNextRound: () => {}
};
