import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { DND_ITEM_TYPES } from '../../constants/dnd-item-types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { getGamePieceSrc } from '../../util/game-board/get-game-piece-src/get-game-piece-src';

export const GamePiece = props => {
  const { canDrag, color, dndType, x, y } = props;

  const [{ isDragging }, drag, preview] = useDrag({
    canDrag: () => canDrag(),
    item: { type: dndType, color, fromX: x, fromY: y },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const src = getGamePieceSrc(color);

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
  canDrag: PropTypes.func,
  color: PropTypes.string,
  dndType: PropTypes.oneOf(Object.values(DND_ITEM_TYPES)),
  x: PropTypes.number,
  y: PropTypes.number
};

GamePiece.defaultProps = {
  canDrag: () => true,
  color: null,
  dndType: DND_ITEM_TYPES.ORDER_PIECE,
  x: null,
  y: null
};
