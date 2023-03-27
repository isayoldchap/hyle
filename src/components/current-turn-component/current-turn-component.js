import PropType from 'prop-types';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { Roles } from '../../engine/engine';
import NextTileComponent from '../next-tile-component/next-tile-component.connected';
import { EndOfRoundComponent } from '../end-of-round-component/end-of-round-component';
import { EndOfGameComponent } from '../end-of-game-component/end-of-game-component';

export class CurrentTurnComponent extends React.Component {
  renderRoleSpecificContent() {
    const { turn } = this.props;

    if (turn === Roles.CHAOS) {
      return this.renderChaos();
    }
    if (turn === Roles.ORDER) {
      return this.renderOrder();
    }
    return undefined;
  }

  renderChaos() {
    return (
      <div>
        <h3>Chaos</h3>
        <NextTileComponent height={75} width={75} />
      </div>
    );
  }

  renderOrder() {
    const { pass } = this.props;
    return (
      <div>
        <h3>Order</h3>
        <p>Make a move or </p>
        <span>
          <RaisedButton label="Pass" primary onClick={pass} />
        </span>
      </div>
    );
  }

  renderUndoButton() {
    const { back } = this.props;
    return <RaisedButton label="Undo" primary onClick={back} />;
  }

  renderEndOfRound() {
    const { startNextRound, startNewGame, endOfGame, winner } = this.props;
    if (endOfGame) {
      return <EndOfGameComponent handleStartNewGame={startNewGame} winner={winner} />;
    }
    return <EndOfRoundComponent handleStartNextRound={startNextRound} />;
  }

  render() {
    const { moveNumber, roundNumber, endOfRound } = this.props;
    return (
      <div>
        <p>Round number: {roundNumber}</p>
        <p>Move number: {moveNumber}</p>
        {!endOfRound && this.renderRoleSpecificContent()}
        {endOfRound && this.renderEndOfRound()}
      </div>
    );
  }
}

CurrentTurnComponent.propTypes = {
  back: PropType.func,
  endOfGame: PropType.bool,
  endOfRound: PropType.bool.isRequired,
  moveNumber: PropType.number,
  pass: PropType.func.isRequired,
  roundNumber: PropType.number,
  startNewGame: PropType.func.isRequired,
  startNextRound: PropType.func.isRequired,
  turn: PropType.string.isRequired,
  winner: PropType.string
};
