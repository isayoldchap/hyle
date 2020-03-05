import Chance from 'chance';

const initChance = seed => {
  // chance constructor must be looking at length because a seed of null produces non-random behavior
  if (seed) return new Chance(seed);
  return new Chance();
};

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
