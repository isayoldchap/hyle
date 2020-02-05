import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../constants/dnd-item-types';

export const GameCell = props => {
  const { children, x, y, moveGamePiece, canMoveGamePiece } = props;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [DND_ITEM_TYPES.GAME_PIECE, DND_ITEM_TYPES.CHAOS_PIECE],
    drop: item => moveGamePiece(x, y, item),
    canDrop: item => canMoveGamePiece(x, y, item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  let backgroundColor = 'transparent';
  if (isOver && !canDrop) backgroundColor = 'red';
  if (!isOver && canDrop) backgroundColor = 'yellow';
  if (isOver && canDrop) backgroundColor = 'green';

  return (
    <div
      ref={drop}
      style={{
        height: '100%',
        position: 'relative',
        width: '100%',
        backgroundColor: '#dfdfdf',
        boxShadow: 'inset 2px 2px 0 rgba(255, 255, 255, 0.25), inset -2px -2px 0 #b0b0b0'
      }}
    >
      <div>{children}</div>

      {(isOver || (!isOver && canDrop)) && (
        <div
          style={{
            backgroundColor,
            height: '100%',
            opacity: 0.15,
            position: 'absolute',
            width: '100%'
          }}
        />
      )}
    </div>
  );
};

GameCell.propTypes = {
  canMoveGamePiece: PropTypes.func,
  children: PropTypes.node,
  moveGamePiece: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

GameCell.defaultProps = {
  canMoveGamePiece: () => {},
  children: null,
  moveGamePiece: () => {},
  x: 0,
  y: 0
};
