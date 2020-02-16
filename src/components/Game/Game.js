import React from 'react';
// import BoardContainer from '../BoardContainer/BoardContainer.connected';
import Board from '../Board/Board.connected';
import CurrentTurnComponent from '../CurrentTurnComponent/CurrentTurnComponent.connected';
import MatchScoreComponent from '../MatchScoreComponent/MatchScoreComponent.connected';
import RemainingPiecesComponent from '../RemainingPiecesComponent/RemainingPiecesComponent.connected';
import ScoreComponent from '../ScoreComponent/ScoreComponent.connected';

class Game extends React.Component {
  render() {
    return (
      <div id="game">
        <div id="board-ui">
          <Board />
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
