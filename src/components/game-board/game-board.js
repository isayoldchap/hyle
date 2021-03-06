import React, { Component } from 'react';
import './game-board.css';
import { GamePiece } from '../game-piece/game-piece';
import { GameCell } from '../game-cell/game-cell';
import { GameBoardDragLayer } from './game-board-drag-layer/game-board-drag-layer';
import PropTypes from 'prop-types';
import { withResizeDimensions } from '../with-resize-dimensions/with-resize-dimensions';
import { Roles } from '../../engine/engine';
import { isEqual } from 'lodash';
import { GameScoreboard } from '../game-scoreboard/game-scoreboard';
import NewGameDialog from '../NewGameDialog/NewGameDialog';

export class GameBoardComponent extends Component {
  static propTypes = {
    cells: PropTypes.array,
    height: PropTypes.number,
    id: PropTypes.string,
    legalMoves: PropTypes.array,
    movePiece: PropTypes.func,
    newGame: PropTypes.func,
    size: PropTypes.number,
    turn: PropTypes.string
  };

  static defaultProps = {
    cells: [],
    height: null,
    id: null,
    legalMoves: [],
    movePiece: () => {},
    newGame: () => {},
    size: null,
    turn: null
  };

  constructor(props) {
    super(props);

    this.state = { newGameModalActive: false };

    this.canMoveGamePiece = this.canMoveGamePiece.bind(this);
    this.closeNewGameModal = this.closeNewGameModal.bind(this);
    this.moveGamePiece = this.moveGamePiece.bind(this);
    this.openNewGameModal = this.openNewGameModal.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  moveGamePiece(toX, toY, gamePiece) {
    if (!this.canMoveGamePiece(toX, toY, gamePiece)) return;

    const { movePiece } = this.props;
    const toCoordinate = { x: toX, y: toY };

    const { fromX, fromY } = gamePiece;
    const fromCoordinate = { x: fromX, y: fromY };
    movePiece(toCoordinate, fromCoordinate);
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

  closeNewGameModal() {
    this.setState({
      newGameModalActive: false
    });
  }

  openNewGameModal() {
    this.setState({
      newGameModalActive: true
    });
  }

  startGame(gameParams) {
    const { newGame } = this.props;

    this.closeNewGameModal();
    newGame(gameParams);
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
    const { newGameModalActive } = this.state;

    const cellSize = this.calculateCellSize();

    const cells = this.renderCells();
    const className = `grid grid--${size}`;

    return (
      <React.Fragment>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <GameScoreboard cellSize={cellSize} />
        </div>
        <div className="game-board-wrapper" id={id}>
          <div className={className}>{cells}</div>
          <GameBoardDragLayer cellSize={cellSize} />
        </div>
        <div style={{ width: 800, maxWidth: 800, margin: '1rem auto', textAlign: 'center' }}>
          <button
            type="button"
            onClick={this.openNewGameModal}
            style={{
              background: 'lightCoral',
              textTransform: 'uppercase',
              fontWeight: 200,
              fontSize: '.8rem',
              border: 'none',
              borderRadius: 3,
              color: 'white',
              flex: 1,
              margin: '0 1rem',
              padding: '.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            <span>New Game</span>
          </button>
        </div>
        <NewGameDialog open={newGameModalActive} startAction={this.startGame} closeAction={this.closeNewGameModal} />
      </React.Fragment>
    );
  }
}

export const GameBoard = withResizeDimensions(GameBoardComponent);
