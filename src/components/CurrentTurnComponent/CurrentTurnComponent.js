import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import { Roles } from "../../engine/engine";
import NextTileComponent from "../NextTileComponent/NextTileComponent.connected";
import {EndOfRoundComponent} from "../EndOfRoundComponent/EndOfRoundComponent";

export class CurrentTurnComponent extends React.Component {
  render() {
    const { moveNumber, endOfRound } = this.props;
    return (
      <div>
        {this.renderUndoButton()}
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
    const {back} = this.props;
    return <RaisedButton label="Undo" primary={true} onClick={back} />;
  }

  renderEndOfRound() {
    const {startNextRound} = this.props;
    return <EndOfRoundComponent handleStartNextRound={startNextRound} />;
  }
}
