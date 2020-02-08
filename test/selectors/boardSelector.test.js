import {
    squaresSelector,
    sizeSelector,
  } from "../../src/selectors/boardSelector.js";
  
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
  
  
  describe("Am empty board", () => {
    it("should initialize to the size provided", () => {
      const myBoard = initializeEntropyBoard(2);
      assert.equal(myBoard.length, 2);
    });
  });