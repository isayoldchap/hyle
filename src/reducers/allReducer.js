import boardReducer from './boardReducer';
import {combineReducers} from 'redux';

const DEFAULT = {
  toggle: false
};

const toggleReducer = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'TOGGLE':
      const oldToggleState = state.toggle;
      return Object.assign({}, {toggle: !oldToggleState});
    default:
      return state;
  }
};

const allReducer = combineReducers({
  toggleSilo: toggleReducer,
  boardSilo: boardReducer
});

export default allReducer;
