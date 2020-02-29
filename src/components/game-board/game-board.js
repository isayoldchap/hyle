import React, { Component } from 'react';
import './game-board.css';
import { GamePiece } from '../game-piece/game-piece';
import { GameCell } from '../game-cell/game-cell';
import { GameBoardDragLayer } from './game-board-drag-layer/game-board-drag-layer';
import PropTypes from 'prop-types';
import { withResizeDimensions } from '../with-resize-dimensions/with-resize-dimensions';
import { Roles } from '../../engine/engine';
import { isEqual } from 'lodash';
import { ConnectedGameScoreboard } from '../game-scoreboard/game-scoreboard.connected';

export class GameBoardComponent extends Component {
  static propTypes = {
    cells: PropTypes.array,
    height: PropTypes.number,
    id: PropTypes.string,
    legalMoves: PropTypes.array,
    movePiece: PropTypes.func,
    size: PropTypes.number,
    turn: PropTypes.string
  };

  static defaultProps = {
    cells: [],
    height: null,
    id: null,
    legalMoves: [],
    movePiece: () => {},
    size: null,
    turn: null
  };

  constructor(props) {
    super(props);

    this.moveGamePiece = this.moveGamePiece.bind(this);
    this.canMoveGamePiece = this.canMoveGamePiece.bind(this);
  }

  moveGamePiece(toX, toY, gamePiece) {
    const { movePiece } = this.props;

    if (this.canMoveGamePiece(toX, toY, gamePiece)) {
      const toCoordinate = { x: toX, y: toY };

      const { fromX, fromY } = gamePiece;
      const fromCoordinate = { x: fromX, y: fromY };
      movePiece(toCoordinate, fromCoordinate);
    }
  }

  // TODO: Debounce this?
  canMoveGamePiece(toX, toY, gamePiece) {
    const { legalMoves, turn } = this.props;

    const toCoordinate = { x: toX, y: toY };

    if (turn === Roles.ORDER && gamePiece) {
      const fromCoordinate = { x: gamePiece.fromX, y: gamePiece.fromY };

      const legalMovesFromCurrent = legalMoves.filter(legalMove => {
        const { start } = legalMove;
        return isEqual(start, fromCoordinate);
      });

      return Boolean(legalMovesFromCurrent.find(({ end }) => isEqual(end, toCoordinate)));
    }

    return Boolean(legalMoves.find(coordinate => isEqual(coordinate, toCoordinate)));
  }

  calculateCellSize() {
    const { height, size } = this.props;
    return height / size;
  }

  renderCells() {
    const { cells, turn } = this.props;

    const canDrag = () => {
      return Boolean(turn === Roles.ORDER);
    };

    return cells.map(cell => {
      const { row: y, col: x, key, color } = cell;
      return (
        <GameCell
          key={key}
          x={x}
          y={y}
          moveGamePiece={(toX, toY, item) => this.moveGamePiece(toX, toY, item)}
          canMoveGamePiece={(toX, toY, item) => this.canMoveGamePiece(toX, toY, item)}
        >
          {color && <GamePiece color={color} x={x} y={y} canDrag={canDrag} />}
        </GameCell>
      );
    });
  }

  render() {
    const { id, size } = this.props;

    const cellSize = this.calculateCellSize();

    const cells = this.renderCells();
    const className = `grid grid--${size}`;

    return (
      <React.Fragment>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <ConnectedGameScoreboard cellSize={cellSize} />
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
