import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ConnectedApp from '../App/App.connected';
import Game from '../Game/Game';

import '../../css/App.css';
import '../../css/bootstrap.css';
import '../../css/bootstrap-theme.css';

class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={ConnectedApp} />
          <div style={{ margin: 10 }}>
            <Switch>
              <Route path="/currentGame" component={Game} />
              <Route component={Game} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
