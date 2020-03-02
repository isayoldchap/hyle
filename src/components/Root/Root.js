import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ConnectedApp from "../App/App.connected";
import Game from "../Game/Game";
import { GameScreen } from "../game-screen/game-screen";

// import "../../css/App.css";
// import "../../css/bootstrap.css";
// import "../../css/bootstrap-theme.css";

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div style={{ margin: 10 }}>
            {/* <Switch> */}
              <Route path="/currentGame" component={ConnectedApp} />
              <Route path="/currentGame" component={Game} />
              <Route path="/newUI" component={GameScreen} />
            {/* </Switch> */}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
