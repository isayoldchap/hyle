import {scorePattern} from '../scorer';
import {allRowsAndColumns} from '../reducers/boardReducer';
import {boardSelector} from './boardSelectors';

export const scoreSelector = (state) => {
  const board = boardSelector(state);
  const allScoreablePatterns = allRowsAndColumns(board);

  const combinedScore = allScoreablePatterns.reduce((score, sequence) => {
    const patternToScore = sequence.map(characterForCell).join("");
    return score + scorePattern(patternToScore.trim());
  }, 0);

  return combinedScore;
}

const characterForCell = (cell) => {
  return cell.color ? cell.color.substring(0,1) : ' ';
};
