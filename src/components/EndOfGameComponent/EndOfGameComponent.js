import React from "react";
import PropType from "prop-types";

export class EndOfGameComponent extends React.Component {
  render() {
    const { player1Name, player1Score, player2Name, player2Score } = this.props;
    return (
      <div>
        <h3>Player 1: {player1Name}</h3>
        <h4>Score: {player1Score}</h4>

        <h3>Player 2: {player2Name}</h3>
        <h4>Score: {player2Score}</h4>
      </div>
    );
  }
}

EndOfGameComponent.propTypes = {
  player1Name: PropType.string,
  player1Score: PropType.number.required,
  player2Name: PropType.string,
  player2Score: PropType.number.required
};
