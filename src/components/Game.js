import React from 'react';
import BoardContainer from './BoardContainer';
import CurrentTurnComponent from './CurrentTurnComponent';
import MatchScoreComponent from './MatchScoreComponent';
import RemainingPiecesComponent, {RemainingPiecesComponentOrientation} from './RemainingPiecesComponent';
import ScoreContainer from './ScoreContainer';
import {withSize} from './WithSize';

class Game extends React.Component {
  render() {
    return (
      <div className="grid">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <BoardContainer/>
            <RemainingPiecesComponent width={80} orientation={RemainingPiecesComponentOrientation.HORIZONTAL}/>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 ">
            <CurrentTurnComponent />
            <ScoreContainer />
            <MatchScoreComponent />    
          </div>
        </div>
        
      </div>
    );
  }
}

export default Game;

