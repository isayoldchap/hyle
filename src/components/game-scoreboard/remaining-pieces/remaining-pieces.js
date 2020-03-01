import React from 'react';
import { getGamePieceSrc } from '../../../util/game-board/get-game-piece-src/get-game-piece-src';
import PropTypes from 'prop-types';

export const RemainingPieces = props => {
  const { colorCounts } = props;
  const remainingPieces = colorCounts.map(colorCount => {
    const { color, count } = colorCount;

    const src = getGamePieceSrc(color);
    return (
      <div key={color} style={{ padding: '0 .5rem', display: 'inline-block' }}>
        <img align="left" alt="remaining piece" src={src} style={{ width: '2rem', height: '2rem' }} />
        <span style={{ lineHeight: '2rem' }}>{count}</span>
      </div>
    );
  });
  return <div>{remainingPieces}</div>;
};

RemainingPieces.propTypes = {
  colorCounts: PropTypes.array
};

RemainingPieces.defaultProps = {
  colorCounts: []
};
