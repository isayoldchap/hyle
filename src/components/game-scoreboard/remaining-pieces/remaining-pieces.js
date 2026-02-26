import React from 'react';
import { getGamePieceSrc } from '../../../util/game-board/get-game-piece-src/get-game-piece-src';
import PropTypes from 'prop-types';

export const RemainingPieces = props => {
  const { colorCounts } = props;
  const remainingPieces = colorCounts.map(colorCount => {
    const { color, count } = colorCount;

    const src = getGamePieceSrc(color);
    return (
      <div key={color} style={{ padding: '0 0.3rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
        <img alt="remaining piece" src={src} style={{ width: '1.6rem', height: '1.6rem' }} />
        <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{count}</span>
      </div>
    );
  });
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      {remainingPieces}
    </div>
  );
};

RemainingPieces.propTypes = {
  colorCounts: PropTypes.array
};

RemainingPieces.defaultProps = {
  colorCounts: []
};
