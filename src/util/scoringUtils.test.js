import { scoreCombo, scoreSingle } from './scoringUtils';
import { assert } from 'chai';

describe('A scorer', () => {
  it('should score assymetrical patterns as zero', () => {
    assert.equal(scoreSingle('XOY'), 0);
  });

  it('should score individual scores properly', () => {
    assert.equal(scoreSingle('O'), 0);
    assert.equal(scoreSingle('OO'), 2);
    assert.equal(scoreSingle('OOO'), 3);
    assert.equal(scoreSingle('OOOO'), 4);
    assert.equal(scoreSingle('XXXXX'), 5);
  });

  it('should score combinations properly', () => {
    assert.equal(scoreCombo('XXX'), 7);
    assert.equal(scoreCombo('XXOXX'), 12);
    assert.equal(scoreCombo('OOOO'), 16);
    assert.equal(scoreCombo('XXXXX'), 30);
  });
});
