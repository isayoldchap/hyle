import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../constants/dnd-item-types';
import './game-cell.css';

export const GameCell = props => {
  const { children, x, y, moveGamePiece, canMoveGamePiece } = props;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [DND_ITEM_TYPES.ORDER_PIECE, DND_ITEM_TYPES.CHAOS_PIECE],
    drop: item => moveGamePiece(x, y, item),
    canDrop: item => canMoveGamePiece(x, y, item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  let overlayClassName = 'game-cell-overlay';
  if (isOver && canDrop) {
    overlayClassName += ' game-cell-overlay--hover';
  } else if (canDrop) {
    overlayClassName += ' game-cell-overlay--legal';
  }

  return (
    <div ref={drop} className="game-cell">
      <div>{children}</div>
      <div className={overlayClassName} />
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
