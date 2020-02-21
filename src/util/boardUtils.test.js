import { initializeEntropyBoard } from '../engine/engine';

import { assert } from 'chai';

describe('Am empty board', () => {
  it('should initialize to the size provided', () => {
    const myBoard = initializeEntropyBoard(2);
    assert.equal(myBoard.length, 2);
  });
});
