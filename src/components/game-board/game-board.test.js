/* global expect, create, shallow, sinon */
import React from 'react';
import { GameBoardComponent } from './game-board';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { entropyReducer } from '../../ducks/entropyDuck';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<GameBoardComponent />', () => {
  afterEach(() => {
    sinon.restore();
  });

  const middleware = composeWithDevTools(applyMiddleware(thunk));
  const store = createStore(entropyReducer, middleware);

  describe('When it renders', () => {
    it('should render correctly', () => {
      const component = create(
        <MuiThemeProvider>
          <Provider store={store}>
            <DndProvider backend={TouchBackend}>
              <GameBoardComponent />
            </DndProvider>
          </Provider>
        </MuiThemeProvider>
      ).toJSON();

      expect(component).to.matchSnapshot();
    });
  });

  describe('this.moveGamePiece', () => {
    it('should return undefined if this.canMoveGamePiece returns false', () => {
      const canMoveGamePiece = sinon.fake.returns(false);
      const component = shallow(<GameBoardComponent />);
      component.instance().canMoveGamePiece = canMoveGamePiece;
      const result = component.instance().moveGamePiece();
      expect(result).to.equal(undefined);
    });

    it('should call this.props.movePiece with the correct arguments if this.canMoveGamePiece returns true', () => {
      const canMoveGamePiece = sinon.fake.returns(true);
      const movePiece = sinon.spy();

      const toX = 1;
      const toY = 2;
      const gamePiece = { fromX: 3, fromY: 4 };
      const component = shallow(<GameBoardComponent movePiece={movePiece} />);
      component.instance().canMoveGamePiece = canMoveGamePiece;

      component.instance().moveGamePiece(toX, toY, gamePiece);
      expect(movePiece.calledWith({ x: 1, y: 2 }, { x: 3, y: 4 })).to.equal(true);
    });
  });
});
