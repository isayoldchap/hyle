import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import gameReducer from './reducers/gameReducer';

const store = createStore(gameReducer);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
