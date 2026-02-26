import React from 'react';
import PropTypes from 'prop-types';

export const EndOfRoundActionItem = props => {
  const { startNextRound } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '0.6rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>End of Round</p>
      <button type="button" onClick={startNextRound} className="btn">
        Continue
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
