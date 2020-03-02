import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ConnectedApp from '../App/App.connected';
import Game from '../Game/Game';
import { GameScreen } from '../game-screen/game-screen';

export const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <div style={{ margin: 10 }}>
          <Switch>
            <Route exact path="/" component={GameScreen} />
            <Route
              path="/currentGame"
              component={() => {
                return (
                  <React.Fragment>
                    <ConnectedApp />
                    <Game />
                  </React.Fragment>
                );
              }}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
