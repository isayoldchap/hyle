import React from 'react';
import Board from './Board';
import CurrentTurnComponent from './CurrentTurnComponent';
import MatchScoreComponent from './MatchScoreComponent';

class Game extends React.Component {
  render() {
    return (
      <div className="grid">
        <div className="row board">
          <div className="col-md-9">
            <Board squareHeight="80"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-3" >
            <CurrentTurnComponent />
          </div>
          <div className="col-md-3 col-sm-3">
            <MatchScoreComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
