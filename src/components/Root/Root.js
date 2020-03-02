import React from 'react';
import {
  BrowserRouter,
  Route,
  // Switch,
  Redirect
} from 'react-router-dom';
import ConnectedApp from '../App/App.connected';
import Game from '../Game/Game';
import { GameScreen } from '../game-screen/game-screen';

export const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <div style={{ margin: 10 }}>
          {/* <Switch> */}
          <Redirect from="/" to="/newUI" />
          <Route path="/currentGame" component={ConnectedApp} />
          <Route path="/currentGame" component={Game} />
          <Route path="/newUI" component={GameScreen} />
          {/* </Switch> */}
        </div>
      </div>
    </BrowserRouter>
  );
};
