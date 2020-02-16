import PropType from 'prop-types';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { Roles } from '../../engine/engine';
import NextTileComponent from '../NextTileComponent/NextTileComponent.connected';
import { EndOfRoundComponent } from '../EndOfRoundComponent/EndOfRoundComponent';
import { EndOfGameComponent } from '../EndOfGameComponent/EndOfGameComponent';

export class CurrentTurnComponent extends React.Component {
  render() {
    const { moveNumber, roundNumber, endOfRound } = this.props;
    return (
      <div>
        {/* {this.renderUndoButton()} */}
        <p>Round number: {roundNumber}</p>
        <p>Move number: {moveNumber}</p>
        {!endOfRound && this.renderRoleSpecificContent()}
        {endOfRound && this.renderEndOfRound()}
      </div>
    );
  }

  renderRoleSpecificContent() {
    const { turn } = this.props;

    if (turn === Roles.CHAOS) {
      return this.renderChaos();
    } else if (turn === Roles.ORDER) {
      return this.renderOrder();
    } else return undefined;
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
          <RaisedButton label="Pass" primary={true} onClick={pass} />
        </span>
      </div>
    );
  }

  renderUndoButton() {
    const { back } = this.props;
    return <RaisedButton label="Undo" primary={true} onClick={back} />;
  }

  renderEndOfRound() {
    const { startNextRound, startNewGame, endOfGame, winner } = this.props;
    if (endOfGame) {
      return (
        <EndOfGameComponent handleStartNewGame={startNewGame} winner={winner} />
      );
    } else {
      return <EndOfRoundComponent handleStartNextRound={startNextRound} />;
    }
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
