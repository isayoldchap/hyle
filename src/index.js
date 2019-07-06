import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./css/index.css";
import Root from "./components/Root/Root";
import registerServiceWorker from "./registerServiceWorker";
import gameReducer from "./reducers/gameReducer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const store = createStore(gameReducer);

window.store = store;

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
