import {AllColors} from '../reducers/gameReducer';
import {sizeSelector} from '../ducks/boardDuck';

export const remainingColorCounts = (state) => {
  const remainingColors = remainingPieces(state);
  return remainingCounts(remainingColors);
};

export const remainingCounts = (remainingColors) => {
  const allCounts =  remainingColors.reduce((colorCounts, color) => {
    if (!colorCounts[color]) {
      colorCounts[color] = 1;
      return colorCounts;
    } else {
      const currentCount = colorCounts[color];
      colorCounts[color] = currentCount + 1;
      return colorCounts;
    }
  }, {});

  return Object.keys(allCounts).map((color) => {
    return {color, count: allCounts[color]}
  }).sort((a, b) => {
    return b.count-a.count;
  });
};

export const nextTile = (state) => {
  const colorSequence = remainingPieces(state);
  return colorSequence && colorSequence.length > 0 ? colorSequence[0] : undefined;
};

export const colors = (state) => {
  const size = sizeSelector(state);
  return AllColors.slice(0, size);
};

export const remainingPieces = (state) => {
  return state.remainingPieces;
};

export const moveNumber = (state) => {
  return state.moveNumber;
};

export const roundNumber = (state) => {
  return state.round;
};

export const turn = (state) => {
  return state.turn;
};

export default nextTile;
