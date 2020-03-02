import './css/index.css';
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { entropyReducer } from './ducks/entropyDuck';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Root } from './components/Root/Root';

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
