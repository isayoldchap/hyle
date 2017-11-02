import {scorePattern} from '../scorer';
import {boardReducer, allRowsAndColumns} from '../reducers/boardReducer';
import {boardSelector} from './boardSelectors';

export const scoreSelector = (state) => {
  const board = boardSelector(state);
  const allScoreablePatterns = allRowsAndColumns(board);

  const combinedScore = allScoreablePatterns.reduce((score, pattern) => {
    const stringToScore = pattern.map(each => {
      const colorCharacter = each.color ? each.color.substring(0,1) : ' ';
      return colorCharacter;
    }).join("");
    return score + scorePattern(stringToScore.trim());
  }, 0);

  return combinedScore;
}
