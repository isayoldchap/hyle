import { expect } from 'chai';
import { generateGamePieceSequence } from './sequenceGenerator';

describe('A sequence generator', () => {
  const colors = ['Red', 'White', 'Blue'];
  it('should generate a sequence that is the square of the number of colors', () => {
    const sequence = generateGamePieceSequence(colors, 'testSeed');
    const sequence2 = generateGamePieceSequence(colors, 'testSeed');
    expect(sequence.length).to.be.eq(9);
    expect(sequence).to.be.eql(sequence2);
  });
});

describe('A sequence generator', () => {
  const colors = ['Red', 'White', 'Blue', 'Green'];
  it('should generate a sequence that is the square of the number of colors', () => {
    const sequence = generateGamePieceSequence(colors, 'testSeed');
    expect(sequence.length).to.be.eq(Math.pow(colors.length, 2));
  });

  it('should generate identical sequences when seeds match', () => {
    const seed = 'testSeed';
    const sequence = generateGamePieceSequence(colors, seed);
    const sequence2 = generateGamePieceSequence(colors, seed);
    expect(sequence).to.be.eql(sequence2);
  });
});
