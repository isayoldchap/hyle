import React, { Component } from 'react';
import {connect} from 'react-redux';
import Board from './Board';
import '../css/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ENTROPY</h1>
        </header>
        <p className="App-intro">
          Welcome to the classic strategy game of order and chaos!
        </p>
        <Board />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {toggle: state};
}

export default connect(mapStateToProps)(App);
