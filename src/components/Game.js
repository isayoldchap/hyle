import React from "react";
import BoardContainer from "./BoardContainer";
import CurrentTurnComponent from "./CurrentTurnComponent";
import MatchScoreComponent from "./MatchScoreComponent";
import RemainingPiecesComponent from "./RemainingPiecesComponent";
import ScoreComponent from "./ScoreComponent";

class Game extends React.Component {
  render() {
    return (
      <div id="game">
        <div id="board-ui" id="board-container">
          <BoardContainer />
          <RemainingPiecesComponent />
        </div>
        <div id="game-info">
          <CurrentTurnComponent />
          <ScoreComponent />
          <MatchScoreComponent />
        </div>
      </div>
    );
  }
}

export default Game;
