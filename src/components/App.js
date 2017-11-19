import React, { Component } from 'react';
import {connect} from 'react-redux';
import Board from './Board';
import CurrentTurnComponent from './CurrentTurnComponent';
import MatchScoreComponent from './MatchScoreComponent';
import RemainingPiecesComponent from './RemainingPiecesComponent';

import '../css/App.css';
import '../css/bootstrap.css'
import '../css/bootstrap-theme.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ENTROPY</h1>
          <p className="App-intro">
            Welcome to the classic strategy game of order and chaos!
          </p>
        </header>

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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const computedProps = Object.assign({}, {turn: state.turn});
  return computedProps;
};

export default connect(mapStateToProps)(App);
