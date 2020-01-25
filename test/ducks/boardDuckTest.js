import {
  squaresSelector,
  legalChaosMovesSelector,
  legalOrderMoveSelector,
  placeTile,
  sizeSelector,
  allMovesFromSquare,
  allLegalMovesFromSquare
} from "../../src/ducks/boardDuck.js";

import {
  initializeEntropyBoard
} from '../../src/entropy.js';

import { assert } from "chai";

describe("A board", () => {
  const myBoard = initializeEntropyBoard(5);
  const gameState = {
    board: myBoard
  };

  it("should initialize to the size provided", () => {
    assert.equal(sizeSelector(gameState), 5);
  });

  it("should have 25 squares", () => {
    const squares = squaresSelector(gameState);
    assert.equal(squares.length, 25);
  });
});

describe("Order Move Logic", () => {
  const myBoard = [
    [
      { row: 1, col: 1, key: "1:1", color: "blue" },
      { row: 1, col: 2, key: "1:2", color: undefined }
    ],
    [
      { row: 2, col: 1, key: "2:1", color: undefined },
      { row: 2, col: 2, key: "2:2", color: undefined }
    ]
  ];

  it("should calc all the legal moves from the start square", () => {
    const startSquare = { row: 1, col: 1 };
    const legalMoves = allLegalMovesFromSquare({ board: myBoard }, startSquare);
    assert.equal(legalMoves.length, 2);
  });
});

describe("Chaos move logic", () => {
  const myBoard = initializeEntropyBoard(3);

  it("should allow placement at any empty board location", () => {
    assert.equal(legalChaosMovesSelector({ board: myBoard }).length, 9);
  });

  it("should allow one fewer moves after the first move has been made", () => {
    const updatedBoard = placeTile({ board: myBoard }, 1, 1, "red");
    assert.equal(legalChaosMovesSelector({ board: updatedBoard }).length, 8);
  });
});

describe("Order move logic on mini boards", () => {
  const myBoard = initializeEntropyBoard(2);

  it("should be no legal order moves until chaos has made a move", () => {
    assert.equal(legalOrderMoveSelector({ board: myBoard }).length, 0);
  });

  it("should be two legal order moves after chaos has made a move", () => {
    const updatedBoard = placeTile({ board: myBoard }, 1, 1, "red");
    assert.equal(legalOrderMoveSelector({ board: updatedBoard }).length, 2);
  });

  it("should be no legal moves once the board is full", () => {
    const myBoard = initializeEntropyBoard(1);
    const updatedBoard = placeTile({ board: myBoard }, 1, 1, "red");
    assert.equal(legalOrderMoveSelector({ board: updatedBoard }).length, 0);
  });
});

describe("Am empty board", () => {
  it("should initialize to the size provided", () => {
    const myBoard = initializeEntropyBoard(2);
    assert.equal(myBoard.length, 2);
  });
});
