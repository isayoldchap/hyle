import Chance from "chance";

// The ability to reproduce sequences is important for replaying games
const generateGamePieceSequence = (colors, randomSeed) => {
  const chance = initChance(randomSeed);
  const allGamePieces = initializeAllGamePieces(colors);
  const generatedSequence = [];

  while (allGamePieces.length > 0) {
    let nextIndex = chance.integer({ min: 0, max: allGamePieces.length - 1 });
    let nextPiece = allGamePieces.splice(nextIndex, 1);
    generatedSequence.push(nextPiece[0]);
  }

  return generatedSequence;
};

export default generateGamePieceSequence;

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

const initChance = randomSeed => {
  if (randomSeed) return new Chance(randomSeed);
  else return new Chance();
};
