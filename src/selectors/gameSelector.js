import {ALL_COLORS} from '../reducers/gameReducer';
import {sizeSelector} from '../ducks/boardDuck';

export const remainingColorCounts = (state) => {
  const remainingColors = remainingPieces(state);
  return remainingCounts(remainingColors);
};

const sortColorCounts = (colorCounts) => {
  return Object.keys(colorCounts).map((color) => {
    return {color, count: colorCounts[color]}
  }).sort((a, b) => {
    return b.count-a.count;
  });
};

export const remainingCounts = (remainingColors) => {
  const allCounts =  remainingColors.reduce((colorCounts, color) => {
    if (!colorCounts[color]) {
      colorCounts[color] = 1;
    } else {
      const currentCount = colorCounts[color];
      colorCounts[color] = currentCount + 1;
    }
    return colorCounts;
  }, {});
  return sortColorCounts(allCounts); 
};

export const nextTile = (state) => {
  const colorSequence = remainingPieces(state);
  return colorSequence && colorSequence.length > 0 ? colorSequence[0] : undefined;
};

export const colors = (state) => {
  const size = sizeSelector(state);
  return ALL_COLORS.slice(0, size);
};

export const remainingPieces = (state) => {
  return state.remainingPieces;
};

export const moveNumber = (state) => {
  return state.moveNumber;
};

export const boardSize = (state) => {
	return state.board.length;
};

export const roundNumber = (state) => {
  return state.round;
};

export const turn = (state) => {
  return state.turn;
};

export const endOfRound = (state) => {
	return remainingPieces(state).length === 0;
};

export default nextTile;
