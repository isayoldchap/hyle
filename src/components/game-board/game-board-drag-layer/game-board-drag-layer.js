import React from 'react';
import { useDragLayer } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../../constants/dnd-item-types';
import PropTypes from 'prop-types';
import { getGamePieceSrc } from '../../../util/game-board/get-game-piece-src/get-game-piece-src';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform
  };
}

export const GameBoardDragLayer = props => {
  const { cellSize } = props;
  const { currentOffset, initialOffset, isDragging, item, itemType } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  if (!item) return null;

  const { color } = item;
  const src = getGamePieceSrc(color);

  function renderItem() {
    switch (itemType) {
      case DND_ITEM_TYPES.ORDER_PIECE:
      case DND_ITEM_TYPES.CHAOS_PIECE:
        return <img alt="game piece" src={src} style={{ width: cellSize, height: cellSize }} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset, false)}>{renderItem()}</div>
    </div>
  );
};

GameBoardDragLayer.propTypes = {
  cellSize: PropTypes.number
};

GameBoardDragLayer.defaultProps = {
  cellSize: null
};
