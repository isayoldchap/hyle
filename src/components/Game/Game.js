import React from 'react';
import Board from '../board/board.connected';
import CurrentTurnComponent from '../current-turn-component/current-turn-component.connected';
import MatchScoreComponent from '../match-score-component/match-score-component.connected';
import RemainingPiecesComponent from '../remaining-pieces-component/remaining-pieces-component.connected';
import ScoreComponent from '../score-component/score-component.connected';

function Game() {
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

export default Game;
