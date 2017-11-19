import {initializeBoard, squaresOnBoardSelector, legalChaosMovesSelector, legalOrderMoveSelector, placeTile} from '../../src/ducks/boardDuck.js'
import {assert} from 'chai';

describe("A board", () => {
  it ("should initialize to the size provided", () => {
    const myBoard = initializeBoard(5);
    assert.equal(myBoard.length, 5);
  });
});

describe("Chaos move logic", () => {
  const myBoard = initializeBoard(3);

  it ("should allow placement at any empty board location", () => {
    assert.equal(legalChaosMovesSelector({board: myBoard}).length, 9);
  });

  it ("should allow one fewer moves after the first move has been made", () => {
    const updatedBoard = placeTile({board: myBoard}, 1, 1, "red");
    assert.equal(legalChaosMovesSelector({board: updatedBoard}).length, 8);
  });
});

describe("Order move logic on 2x2 grid", () => {
  const myBoard = initializeBoard(2);

  it ("should be no legal order moves until chaos has made a move", () => {
    assert.equal(legalOrderMoveSelector({board: myBoard}).length, 0);
  });

  it ("should be two legal order moves after chaos has made a move", () => {
    const updatedBoard = placeTile({board: myBoard}, 1, 1, "red");
    assert.equal(legalOrderMoveSelector({board:updatedBoard}).length, 2);
  });

  it ("should be no legal moves once the board is full", () => {
    let board = initializeBoard(1);
    const updatedBoard = placeTile({board: board}, 1, 1, "red");
    assert.equal(legalOrderMoveSelector({board:updatedBoard}).length, 0);
  });
});

describe("Am empty board", () => {
  it ("should initialize to the size provided", () => {
    const myBoard = initializeBoard(2);
    assert.equal(myBoard.length, 2);
  });
});
