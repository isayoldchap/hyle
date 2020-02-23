import React, { Component } from 'react';
import './game-board.css';
import { GamePiece } from '../game-piece/game-piece';
import { GameCell } from '../game-cell/game-cell';
import { DND_ITEM_TYPES } from '../../constants/dnd-item-types';
import { GameBoardDragLayer } from './game-board-drag-layer/game-board-drag-layer';
import PropTypes from 'prop-types';
import { withResizeDimensions } from '../with-resize-dimensions/with-resize-dimensions';

export class GameBoardComponent extends Component {
  static propTypes = {
    height: PropTypes.number,
    id: PropTypes.string,
    size: PropTypes.number
  };

  static defaultProps = {
    height: null,
    id: null,
    size: null
  };

  constructor(props) {
    super(props);
    this.state = { gamePiecePosition: [0, 0] };

    this.moveGamePiece = this.moveGamePiece.bind(this);
    this.canMoveGamePiece = this.canMoveGamePiece.bind(this);
  }

  moveGamePiece(toX, toY, item) {
    if (this.canMoveGamePiece(toX, toY, item)) this.setState({ gamePiecePosition: [toX, toY] });
  }

  canMoveGamePiece(toX, toY, item = {}) {
    const { gamePiecePosition } = this.state;
    const { type } = item;
    const currentX = gamePiecePosition[0];
    const currentY = gamePiecePosition[1];

    if (type === DND_ITEM_TYPES.CHAOS_PIECE && toX !== currentX && toY !== currentY) return true;
    // TODO: Get list of valid cells from Redux:
    return toX === currentX || toY === currentY;
  }

  renderCell(i) {
    const { size } = this.props;
    const x = i % size;
    const y = Math.floor(i / size);
    return (
      <GameCell key={i} x={x} y={y} moveGamePiece={this.moveGamePiece} canMoveGamePiece={this.canMoveGamePiece}>
        {this.renderGamePiece(x, y)}
      </GameCell>
    );
  }

  renderCells() {
    const { size } = this.props;
    const cells = [];
    for (let i = 0; i < size * size; i += 1) {
      cells.push(this.renderCell(i));
    }
    return cells;
  }

  renderGamePiece(x, y) {
    const { gamePiecePosition } = this.state;
    const gamePieceX = gamePiecePosition[0];
    const gamePieceY = gamePiecePosition[1];
    if (x === gamePieceX && y === gamePieceY) {
      return <GamePiece />;
    }
    return null;
  }

  render() {
    const { height, id, size } = this.props;

    const cellSize = height / size;

    const cells = this.renderCells();
    const className = `grid grid--${size}`;

    return (
      <React.Fragment>
        <div style={{ maxWidth: cellSize, maxHeight: cellSize, margin: '0 auto' }}>
          <GamePiece dndType={DND_ITEM_TYPES.CHAOS_PIECE} variant="pink" />
        </div>
        <div className="game-board-wrapper" id={id}>
          <div className={className}>{cells}</div>
          <GameBoardDragLayer cellSize={cellSize} />
        </div>
      </React.Fragment>
    );
  }
}

export const GameBoard = withResizeDimensions(GameBoardComponent);
