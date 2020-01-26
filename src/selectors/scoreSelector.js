import { scoreCombo } from "../util/scorer";
import { boardSelector } from "../ducks/boardDuck";
import { allRowsAndColumns } from "../board";

const characterForCell = cell => {
  return cell.color ? cell.color.substring(0, 1) : " ";
};

// might be better to just have the score in the store instead of computing it each time
const selectScore = state => {
  const board = boardSelector(state);
  const allScoreablePatterns = allRowsAndColumns(board);

  const combinedScore = allScoreablePatterns.reduce((score, sequence) => {
    const patternToScore = sequence.map(characterForCell).join("");
    return score + scoreCombo(patternToScore.trim());
  }, 0);

  return combinedScore;
};

export default selectScore;
