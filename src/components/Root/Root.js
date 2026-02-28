import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedLobby } from '../lobby/lobby.connected';
import { GameScreen } from '../game-screen/game-screen';

export const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ConnectedLobby} />
        <Route path="/game" component={GameScreen} />
      </Switch>
    </BrowserRouter>
  );
};
