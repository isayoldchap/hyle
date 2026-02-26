import React from 'react';
import PropType from 'prop-types';
import { ConnectedRemainingPieces } from '../remaining-pieces/remaining-pieces.connected';

export const ScoreboardHeader = props => {
  const { moveNumber, roundNumber, width } = props;
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        margin: '0 auto',
        marginBottom: '1rem',
        maxWidth: width,
        paddingBottom: '0.75rem',
        width
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.55rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            marginBottom: '0.2rem',
            textTransform: 'uppercase'
          }}>
            Round
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1 }}>{roundNumber}</div>
        </div>

        <div style={{ flex: 2, textAlign: 'center' }}>
          <ConnectedRemainingPieces />
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.55rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            marginBottom: '0.2rem',
            textTransform: 'uppercase'
          }}>
            Move
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1 }}>{moveNumber}</div>
        </div>
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
