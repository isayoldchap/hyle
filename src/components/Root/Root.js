import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ConnectedApp from '../App/App.connected';
import Game from '../Game/Game';
// import "../../css/App.css";
// import "../../css/bootstrap.css";
// import "../../css/bootstrap-theme.css";
import { GameScreen } from '../game-screen/game-screen';

// eslint-disable-next-line react/prefer-stateless-function
class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Switch> */}
        <Route path="/" component={ConnectedApp} />
        {/* <Route path="/" component={Game} /> */}
        <Route path="/" component={GameScreen} />
        {/* </Switch> */}
      </BrowserRouter>
    );
  }
}

export default Root;
