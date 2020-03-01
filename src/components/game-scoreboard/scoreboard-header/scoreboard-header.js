import React from 'react';
import PropType from 'prop-types';
import { ConnectedRemainingPieces } from '../remaining-pieces/remaining-pieces.connected';

export const ScoreboardHeader = props => {
  const { moveNumber, roundNumber, width } = props;
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.5)',
        margin: '0 auto',
        marginBottom: '1rem',
        maxWidth: width,
        paddingBottom: '.5rem',
        width
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>Round: {roundNumber}</div>

        <div style={{ flex: 2, textAlign: 'center' }}>
          <ConnectedRemainingPieces />
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>Move: {moveNumber}</div>
      </div>
    </div>
  );
};

ScoreboardHeader.propTypes = {
  moveNumber: PropType.number,
  roundNumber: PropType.number,
  width: PropType.number
};

ScoreboardHeader.defaultProps = {
  moveNumber: 0,
  roundNumber: 0,
  width: null
};
