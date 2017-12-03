import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import Game from './Game';
import NewGameComponent from './NewGameComponent';
import '../css/App.css';
import '../css/bootstrap.css'
import '../css/bootstrap-theme.css'

class Root extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' component={App} />
          <Route path='/new' component={NewGameComponent} />
          <Route path='/currentGame' component={Game} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
