import React, { Component } from 'react';
import './game-board.css';
import { GamePiece } from '../game-piece/game-piece';
import { GameCell } from '../game-cell/game-cell';
import { DND_ITEM_TYPES } from '../../constants/dnd-item-types';
import { GameBoardDragLayer } from './game-board-drag-layer/game-board-drag-layer';

const GRID_SIZE = 7;

export class GameBoard extends Component {
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
    // TODO: Check for other pieces that are blocking here:
    return toX === currentX || toY === currentY;
  }

  renderCell(i) {
    const x = i % GRID_SIZE;
    const y = Math.floor(i / GRID_SIZE);
    // const widthHeightPercentage = `${100 / GRID_SIZE}%`;
    return (
      <GameCell key={i} x={x} y={y} moveGamePiece={this.moveGamePiece} canMoveGamePiece={this.canMoveGamePiece}>
        {this.renderGamePiece(x, y)}
      </GameCell>
    );
  }

  renderCells() {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
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
    const cells = this.renderCells();

    return (
      <div id="wrapper">
        <div id="grid">{cells}</div>
        <GameBoardDragLayer />
      </div>
    );
  }
}
