import React, { useEffect } from 'react';
import blueTriangleImage from '../game-board/game-pieces/game-piece-blue-triangle-600.png';
import pinkDotImage from '../game-board/game-pieces/game-piece-pink-dot-600.png';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { DND_ITEM_TYPES } from '../../constants/dnd-item-types';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const GamePiece = props => {
  const { dndType, variant } = props;

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: dndType, variant },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const src = variant === 'blue' ? blueTriangleImage : pinkDotImage;

  return (
    <img
      ref={drag}
      alt="game piece"
      src={src}
      style={{ width: '100%', height: '100%', opacity: isDragging ? 0 : 1, cursor: 'move' }}
    />
  );
};

GamePiece.propTypes = {
  dndType: PropTypes.oneOf(Object.values(DND_ITEM_TYPES)),
  variant: PropTypes.string
};

GamePiece.defaultProps = {
  dndType: DND_ITEM_TYPES.GAME_PIECE,
  variant: 'blue'
};
