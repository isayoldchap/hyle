import Chance from 'chance';

const initChance = seed => new Chance(seed);

// non-random - this works but what is a more functional way to do it?
const initializeAllGamePieces = colors => {
  const numberOfColors = colors.length;
  const allGamePieces = new Array(numberOfColors * numberOfColors);

  for (let i = 0; i < numberOfColors; i++) {
    let nextColor = colors[i];
    let offset = i * numberOfColors;
    allGamePieces.fill(nextColor, offset, offset + numberOfColors);
  }
  return allGamePieces;
};

export const makeSequenceGenerator = seed => {
  const chance = initChance(seed);
  return colors => {
    const allGamePieces = initializeAllGamePieces(colors);
    return chance.shuffle(allGamePieces);
  };
};

// The ability to reproduce sequences is important for replaying games
export const generateGamePieceSequence = (colors, seed) => {
  return makeSequenceGenerator(seed)(colors);
};
