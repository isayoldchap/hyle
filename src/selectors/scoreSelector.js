import {scoreCombo} from '../util/scorer';
import {allRowsAndColumns, boardSelector} from '../ducks/boardDuck';

const characterForCell = (cell) => {
  return cell.color ? cell.color.substring(0,1) : ' ';
};

const scoreSelector = (state) => {
  const board = boardSelector(state);
  const allScoreablePatterns = allRowsAndColumns(board);

  const combinedScore = allScoreablePatterns.reduce((score, sequence) => {
    const patternToScore = sequence.map(characterForCell).join("");
    return score + scoreCombo(patternToScore.trim());
  }, 0);

  return combinedScore;
};

export default scoreSelector;
