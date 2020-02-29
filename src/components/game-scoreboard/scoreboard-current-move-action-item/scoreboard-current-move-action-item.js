import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EndOfGameComponent } from '../../EndOfGameComponent/EndOfGameComponent';
import { EndOfRoundComponent } from '../../EndOfRoundComponent/EndOfRoundComponent';
import { Roles } from '../../../engine/engine';
import { GamePiece } from '../../game-piece/game-piece';
import { DND_ITEM_TYPES } from '../../../constants/dnd-item-types';

export class ScoreboardCurrentMoveActionItem extends Component {
  static propTypes = {
    cellSize: PropTypes.number,
    endOfGame: PropTypes.bool,
    endOfRound: PropTypes.bool,
    nextTile: PropTypes.string,
    pass: PropTypes.func,
    startNewGame: PropTypes.func,
    startNextRound: PropTypes.func,
    turn: PropTypes.oneOf(Object.values(Roles)),
    winner: PropTypes.string
  };

  static defaultProps = {
    cellSize: null,
    endOfGame: false,
    endOfRound: false,
    nextTile: null,
    pass: () => {},
    startNewGame: () => {},
    startNextRound: () => {},
    turn: null,
    winner: null
  };

  renderChaos() {
    const { cellSize, nextTile } = this.props;

    return (
      <div style={{ maxWidth: cellSize, maxHeight: cellSize, margin: '0 auto' }}>
        <GamePiece dndType={DND_ITEM_TYPES.CHAOS_PIECE} color={nextTile} />
      </div>
    );
  }

  renderOrder() {
    const { cellSize, pass } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: cellSize }}>
        <button
          type="button"
          onClick={pass}
          style={{
            background: 'lightCoral',
            textTransform: 'uppercase',
            fontWeight: 200,
            letterSpacing: 2,
            border: 'none',
            borderRadius: 3,
            color: 'white',
            display: 'flex',
            flex: 1,
            fontSize: '1.2rem',
            margin: '0 1rem',
            padding: '.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          <span style={{ flex: 1, alignSelf: 'center' }}>Pass</span>
        </button>
      </div>
    );
  }

  renderRoleSpecificContent() {
    const { cellSize, turn } = this.props;

    let content = null;
    if (turn === Roles.CHAOS) content = this.renderChaos();
    if (turn === Roles.ORDER) content = this.renderOrder();

    return (
      <div
        style={{
          textAlign: 'center',
          minHeight: cellSize,
          maxHeight: cellSize
        }}
      >
        {content}
      </div>
    );
  }

  renderEndOfRound() {
    const { startNextRound, startNewGame, endOfGame, winner } = this.props;

    if (endOfGame) {
      return <EndOfGameComponent handleStartNewGame={startNewGame} winner={winner} />;
    }
    return <EndOfRoundComponent handleStartNextRound={startNextRound} />;
  }

  render() {
    const { cellSize, endOfRound } = this.props;

    const currentRoundContent = endOfRound ? this.renderEndOfRound() : this.renderRoleSpecificContent();

    return <div style={{ width: cellSize, margin: '0 .5rem', borderRadius: 5 }}>{currentRoundContent}</div>;
  }
}
