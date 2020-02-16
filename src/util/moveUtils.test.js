import {
  allLegalMovesFromSquare,
  legalOrderMoveSelector,
  legalChaosMovesSelector
} from './moveUtils';

import { placeTileOnBoard } from './boardUtils';

import { initializeEntropyBoard } from '../engine/engine';

import { assert } from 'chai';

describe('Order Move Logic', () => {
  const myBoard = [
    [
      { row: 1, col: 1, key: '1:1', color: 'blue' },
      { row: 1, col: 2, key: '1:2', color: undefined }
    ],
    [
      { row: 2, col: 1, key: '2:1', color: undefined },
      { row: 2, col: 2, key: '2:2', color: undefined }
    ]
  ];

  it('should calc all the legal moves from the start square', () => {
    const startSquare = { row: 1, col: 1 };
    const legalMoves = allLegalMovesFromSquare(myBoard, startSquare);
    assert.equal(legalMoves.length, 2);
  });
});

describe('Chaos move logic', () => {
  const myBoard = initializeEntropyBoard(3);

  it('should allow placement at any empty board location', () => {
    assert.equal(legalChaosMovesSelector(myBoard).length, 9);
  });

  it('should allow one fewer moves after the first move has been made', () => {
    const updatedBoard = placeTileOnBoard(myBoard, 1, 1, 'red');
    assert.equal(legalChaosMovesSelector(updatedBoard).length, 8);
  });
});

describe('Order move logic on mini boards', () => {
  const myBoard = initializeEntropyBoard(2);

  it('should be no legal order moves until chaos has made a move', () => {
    assert.equal(legalOrderMoveSelector(myBoard).length, 0);
  });

  it('should be two legal order moves after chaos has made a move', () => {
    const updatedBoard = placeTileOnBoard(myBoard, 1, 1, 'red');
    assert.equal(legalOrderMoveSelector(updatedBoard).length, 2);
  });

  it('should be no legal moves once the board is full', () => {
    const myBoard = initializeEntropyBoard(1);
    const updatedBoard = placeTileOnBoard(myBoard, 1, 1, 'red');
    assert.equal(legalOrderMoveSelector(updatedBoard).length, 0);
  });
});
