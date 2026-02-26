import { allRowsAndColumns } from '../util/boardUtils';
import { scoreCombo } from '../util/scoringUtils';

const characterForCell = cell => (cell.color ? cell.color.substring(0, 1) : ' ');

export const scoreBoard = board => {
  const patterns = allRowsAndColumns(board);
  return patterns.reduce((total, sequence) => {
    const pattern = sequence.map(characterForCell).join('');
    return total + scoreCombo(pattern.trim());
  }, 0);
};
