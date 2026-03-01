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
    myRole: PropTypes.string,
    nextTile: PropTypes.string,
    pass: PropTypes.func,
    round: PropTypes.number,
    turn: PropTypes.oneOf(Object.values(Roles))
  };

  static defaultProps = {
    cellSize: null,
    endOfGame: false,
    endOfRound: false,
    myRole: null,
    nextTile: null,
    pass: () => {},
    round: 1,
    turn: null
  };

  isMyTurn() {
    const { myRole, round, turn } = this.props;
    if (!myRole) return true;
    if (myRole === 'player1') {
      return (round === 1 && turn === Roles.CHAOS) || (round === 2 && turn === Roles.ORDER);
    }
    if (myRole === 'player2') {
      return (round === 1 && turn === Roles.ORDER) || (round === 2 && turn === Roles.CHAOS);
    }
    return false;
  }

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
        <button type="button" onClick={pass} className="btn">
          Pass
        </button>
      </div>
    );
  }

  renderWaiting() {
    const { cellSize } = this.props;
    return (
      <div
        className="waiting-indicator"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: cellSize,
          gap: '0.2rem',
        }}
      >
        <div style={{
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '0.55rem',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}>
          Waiting
        </div>
        <div style={{
          color: 'rgba(255, 255, 255, 0.18)',
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          for opponent
        </div>
      </div>
    );
  }

  renderRoleSpecificContent() {
    const { cellSize, turn } = this.props;

    let content = null;
    if (!this.isMyTurn()) {
      content = this.renderWaiting();
    } else if (turn === Roles.CHAOS) {
      content = this.renderChaos();
    } else if (turn === Roles.ORDER) {
      content = this.renderOrder();
    }

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
