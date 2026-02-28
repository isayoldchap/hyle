import './css/index.css';
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { entropyReducer, setupSocketListeners } from './ducks/entropyDuck';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Root } from './components/Root/Root';
import { socket } from './socket/socket';

const middleware = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(entropyReducer, middleware);

// Wire all server→client socket events to Redux dispatch.
setupSocketListeners(socket, store.dispatch);

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  root
);
