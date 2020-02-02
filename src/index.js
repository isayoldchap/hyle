import "./css/index.css";
import "./index.html";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Root from "./components/Root/Root";
import gameReducer from "./reducers/gameReducer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(gameReducer, devToolsEnhancer());
const root = document.getElementById('root');

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>,
  root
);