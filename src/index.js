import "./css/index.css";
import "./index.html";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { entropyReducer } from "./reducers/newGameReducer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { composeWithDevTools } from 'redux-devtools-extension';
import Root from "./components/Root/Root";
import thunk from 'redux-thunk';


const middleware = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(entropyReducer, middleware);
const root = document.getElementById('root');

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>,
  root
);