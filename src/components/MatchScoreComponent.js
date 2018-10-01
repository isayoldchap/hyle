import React from "react";
import PropType from "prop-types";

class MatchScoreComponent extends React.Component {
  render() {
    const { player1, player1Score, player2, player2Score } = this.props;

    return (
      <div className="grid">
        <div className="row">
          <div className="col-lg-6">
            <p>{player1}</p>
          </div>
          <div className="col-lg-6">
            <p>{player1Score}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <p>{player2}</p>
          </div>
          <div className="col-lg-6">
            <p>{player2Score}</p>
          </div>
        </div>
      </div>
    );
  }
}

MatchScoreComponent.defaultProps = {
  player1: "Player 1 ",
  player1Score: 0,
  player2: "Player 2 ",
  player2Score: 0
};

export default MatchScoreComponent;
