import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { Roles } from "../reducers/gameReducer";
import { moveNumber, turn, endOfRound } from "../selectors/gameSelector";
import { createPassAction } from "../actioncreators/boardActions";
import { createBackAction } from "../actioncreators/historyActions";
import NextTileComponent from "./NextTileComponent";
import EndOfRoundComponent from "./EndOfRoundComponent";
import { nextRound } from "../actioncreators/gameActions";

class CurrentTurnComponent extends React.Component {
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

    if (turn === Roles.Chaos) {
      return this.renderChaos();
    } else if (turn === Roles.Order) {
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
    const startNextRound = this.props;
    return <EndOfRoundComponent handleStartNextRound={startNextRound} />;
  }
}

const mapStateToProps = state => {
  const computedProps = Object.assign(
    {},
    {
      turn: turn(state),
      moveNumber: moveNumber(state),
      endOfRound: endOfRound(state)
    }
  );
  return computedProps;
};

export default connect(
  mapStateToProps,
  { startNextRound: nextRound, back: createBackAction, pass: createPassAction }
)(CurrentTurnComponent);
