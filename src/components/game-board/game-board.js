import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import blueTriangleImage from './game-pieces/game-piece-blue-triangle-600.png';
import goldXImage from './game-pieces/game-piece-gold-x-600.png';
import greenStarImage from './game-pieces/game-piece-green-star-600.png';
import limeSlashImage from './game-pieces/game-piece-lime-slash-600.png';
import orangeEqualsImage from './game-pieces/game-piece-orange-equals-600.png';
import pinkDotImage from './game-pieces/game-piece-pink-dot-600.png';
import purplePlusImage from './game-pieces/game-piece-purple-plus-600.png';
import resAsteriskImage from './game-pieces/game-piece-red-asterisk-600.png';
import violetMinusImage from './game-pieces/game-piece-violet-minus-600.png';
import './game-board.css';
import Draggable from 'react-draggable';

const GRID_SIZE = 7;

// eslint-disable-next-line react/prefer-stateless-function
export class GameBoard extends Component {
  // static propTypes = {
  //   // reset: PropTypes.func,
  // };

  // static defaultProps = {
  //   // reset: PropTypes.func,
  // };

  constructor(props) {
    super(props);
    this.state = { cells: [] };
    this.handleOnStart = this.handleOnStart.bind(this);
    this.handleOnDrag = this.handleOnDrag.bind(this);
    this.handleOnStop = this.handleOnStop.bind(this);
    this.renderCells = this.renderCells.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomGamePieceImage() {
    const gamePieces = [
      blueTriangleImage,
      goldXImage,
      greenStarImage,
      limeSlashImage,
      orangeEqualsImage,
      pinkDotImage,
      purplePlusImage,
      resAsteriskImage,
      violetMinusImage
    ];
    const randomIndex = Math.floor(Math.random() * gamePieces.length);
    return gamePieces[randomIndex];
  }

  // eslint-disable-next-line class-methods-use-this
  handleOnDrag(event) {
    event.preventDefault();
    console.log('drag event:', event);
  }

  // eslint-disable-next-line class-methods-use-this
  handleOnStop(event) {
    event.preventDefault();
    console.log('stop event:', event);
  }

  // eslint-disable-next-line class-methods-use-this
  handleOnStart(event) {
    event.preventDefault();
    console.log('start event:', event);
  }

  renderCells() {
    const cells = [];
    for (let i = 0; i < GRID_SIZE; i += 1) {
      for (let j = 0; j < GRID_SIZE; j += 1) {
        const key = `cell__${i}${j}`;
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        if (randomNumber >= 9) {
          const gamePieceImage = this.getRandomGamePieceImage();
          cells.push(
            <span className="cell" key={key}>
              <Draggable
                axis="both"
                bounds="#grid"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[136.5, 136.5]}
                scale={1}
                onStart={this.handleOnStart}
                onDrag={this.handleOnDrag}
                onStop={this.handleOnStop}
              >
                <div>
                  <img alt="game piece" src={gamePieceImage} style={{ cursor: 'grab' }} />
                </div>
              </Draggable>
            </span>
          );
        } else {
          cells.push(<span className="cell" key={key} />);
        }
      }
    }
    this.setState({ cells });
  }

  render() {
    const { cells } = this.state;

    return (
      // eslint-disable-next-line react/jsx-fragments
      <React.Fragment>
        <div id="wrapper" style={{ margin: '0 auto' }}>
          <div id="grid" className="">
            {cells}
          </div>
        </div>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <h2>Current Score: 52</h2>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="button" onClick={this.renderCells}>
            Refresh Board
          </button>
        </div>
      </React.Fragment>
    );
  }
}
