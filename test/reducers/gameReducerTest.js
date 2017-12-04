import scoreSelector from '../../src/selectors/scoreSelector';
import gameReducer, {Roles} from '../../src/reducers/gameReducer';
import {legalChaosMovesSelector} from '../../src/ducks/boardDuck';
import {roundNumber, moveNumber, turn, remainingPieces, nextTile} from '../../src/selectors/gameSelector';
import {createSquareClickAction, createPassAction} from '../../src/actioncreators/boardActions';
import {newGame} from '../../src/actioncreators/gameActions';
import {assert} from 'chai';
import {createStore} from 'redux';

describe ("A game reducer", () => {
  describe("Advancing the game by passing", () => {
    const store = createStore(gameReducer);
    const initialState = store.getState();
    const nextColor = nextTile(initialState);

    store.dispatch(createSquareClickAction(2,2));

    const after1Move = store.getState();
    it ("should be orders turn", () => {
      assert.equal(turn(after1Move), Roles.Order);
    });

    it ("should have a move number of one ", () => {
      assert.equal(moveNumber(after1Move), 1);
    });

    store.dispatch(createPassAction());
    const after2Moves = store.getState();

    it ("should be chaos turn", () => {
      assert.equal(turn(after2Moves), Roles.Chaos);
    });
  });

  describe("Advancing the game by moving a piece", () => {
    const store = createStore(gameReducer);
    const initialState = store.getState();

    store.dispatch(createSquareClickAction(2,2));
    store.dispatch(createSquareClickAction(2,2));
    store.dispatch(createSquareClickAction(2,4));

    const after2Moves = store.getState();

    it ("should be chaos turn", () => {
      assert.equal(turn(after2Moves), Roles.Chaos);
    });
  });

  describe("Handling of bad input on order's start move", () => {
    const store = createStore(gameReducer);
    const initialState = store.getState();

    store.dispatch(createSquareClickAction(2,2));
    store.dispatch(createSquareClickAction(16,5));

    const after2Moves = store.getState();

    it ("should still be order's turn", () => {
      assert.equal(turn(after2Moves), Roles.Order);
    });
  });

  describe("Handling of bad input on order's half move", () => {
    const store = createStore(gameReducer);
    const initialState = store.getState();

    store.dispatch(createSquareClickAction(2,2));
    store.dispatch(createSquareClickAction(16,5));

    const after2Moves = store.getState();

    it ("should still be order's turn", () => {
      assert.equal(turn(after2Moves), Roles.Order);
    });
  });

  describe("An initial board state for 4x4 game", () => {
    const store = createStore(gameReducer);
    store.dispatch(newGame({boardSize:4}));
    const initialState = store.getState();

    it ("should have a score of zero ", () => {
      assert.equal(scoreSelector(initialState), 0);
    });

    it ("should have a move number of one ", () => {
      assert.equal(moveNumber(initialState), 1);
    });

    it ("should have a round number of one ", () => {
      assert.equal(roundNumber(initialState), 1);
    });

    it ("should be chaos's turn", () => {
      assert.equal(turn(initialState), "chaos");
    });

    it ("should have 16 legal moves", () => {
      assert.equal(legalChaosMovesSelector(initialState).length, 16);
    });

    it ("should have 16 remaining pieces ", () => {
      assert.equal(remainingPieces(initialState).length, 16);
    });

  });
});
