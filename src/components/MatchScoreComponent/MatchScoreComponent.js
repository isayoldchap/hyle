import React from "react";

export class MatchScoreComponent extends React.Component {
  render() {
    const { player1Name, player1Score, player2Name, player2Score } = this.props;

    return (
      <div className="grid">
        <div className="row">
          <div className="col-lg-6">
            <p>{player1Name}</p>
          </div>
          <div className="col-lg-6">
            <p>{player1Score}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <p>{player2Name}</p>
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
  player1Name: "Player 1 ",
  player1Score: 0,
  player2Name: "Player 2 ",
  player2Score: 0
};

