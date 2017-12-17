import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import Game from './Game';
import HomeComponent from './HomeComponent';

import '../css/App.css';
import '../css/bootstrap.css'
import '../css/bootstrap-theme.css'

class Root extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' component={App} />
          <Switch>
            <Route path='/currentGame' component={Game} />
            <Route component={Game} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
