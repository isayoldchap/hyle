import { connect } from 'react-redux';
import { selectRemainingColorCounts, selectColors } from '../../../selectors/gameSelector';
import { RemainingPieces } from './remaining-pieces';

const mapStateToProps = (state, oldProps) => {
  const theColors = selectColors(state);
  const remainingCounts = selectRemainingColorCounts(state);

  const colorToCount = theColors.map(color => {
    const foundColor = remainingCounts.find(each => {
      return color === each.color;
    });
    const count = foundColor ? foundColor.count : 0;
    return { color, count };
  });

  return { ...oldProps, colorCounts: colorToCount };
};

export const ConnectedRemainingPieces = connect(mapStateToProps)(RemainingPieces);
