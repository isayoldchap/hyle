import React from 'react';
import { useDragLayer } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../../constants/dnd-item-types';
import { snapToGrid } from '../../../util/game-board/snap-to-grid';
import blueTriangleImage from '../game-pieces/game-piece-blue-triangle-600.png';
import pinkDotImage from '../game-pieces/game-piece-pink-dot-600.png';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform
  };
}

export const GameBoardDragLayer = () => {
  const { currentOffset, initialOffset, isDragging, item, itemType } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  if (!item) return null;

  const { variant } = item;

  // TODO: Create util for this. Same code is in <GamePiece />
  const src = variant === 'blue' ? blueTriangleImage : pinkDotImage;

  function renderItem() {
    switch (itemType) {
      case DND_ITEM_TYPES.GAME_PIECE:
      case DND_ITEM_TYPES.CHAOS_PIECE:
        return <img alt="game piece" src={src} style={{ width: 134, height: 134 }} />;
      // return <span style={{ padding: 5, background: 'white', border: '1px solid gray' }}>I am Dragging!</span>;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      {/* <div style={getItemStyles(initialOffset, currentOffset, true)}>{renderItem()}</div> */}
      <div style={getItemStyles(initialOffset, currentOffset, false)}>{renderItem()}</div>
    </div>
  );
};
