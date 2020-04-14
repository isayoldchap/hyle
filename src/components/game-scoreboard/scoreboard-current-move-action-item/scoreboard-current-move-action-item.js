import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Roles } from '../../../engine/engine';
import { GamePiece } from '../../game-piece/game-piece';
import { DND_ITEM_TYPES } from '../../../constants/dnd-item-types';
import { ConnectedEndOfGameActionItem } from './end-of-game-action-item/end-of-game-action-item.connected';
import { ConnectedEndOfRoundActionItem } from './end-of-round-action-item/end-of-round-action-item.connected';

export class ScoreboardCurrentMoveActionItem extends Component {
  static propTypes = {
    cellSize: PropTypes.number,
    endOfGame: PropTypes.bool,
    endOfRound: PropTypes.bool,
    nextTile: PropTypes.string,
    pass: PropTypes.func,
    turn: PropTypes.oneOf(Object.values(Roles))
  };

  static defaultProps = {
    cellSize: null,
    endOfGame: false,
    endOfRound: false,
    nextTile: null,
    pass: () => {},
    turn: null
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
            fontSize: '.8rem',
            border: 'none',
            borderRadius: 3,
            color: 'white',
            display: 'flex',
            flex: 1,
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

  render() {
    const { cellSize, endOfRound, endOfGame } = this.props;

    if (endOfGame) return <ConnectedEndOfGameActionItem cellSize={cellSize} />;

    if (endOfRound) return <ConnectedEndOfRoundActionItem />;

    const currentRoundContent = this.renderRoleSpecificContent();

    return <div style={{ width: cellSize, margin: '0 .5rem', borderRadius: 5 }}>{currentRoundContent}</div>;
  }
}
