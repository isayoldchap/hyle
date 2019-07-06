import {RemainingPiecesComponent} from "./RemainingPiecesComponent";
import { connect } from "react-redux";
import { selectRemainingColorCounts, selectColors } from "../../selectors/gameSelector";

const mapStateToProps = (state, oldProps) => {
    const theColors = selectColors(state);
    const remainingCounts = selectRemainingColorCounts(state);
  
    const colorToCount = theColors.map(color => {
      const foundColor = remainingCounts.find(each => {
        return color === each.color;
      });
      const count = foundColor ? foundColor.count : 0;
      return { color: color, count: count };
    });
  
    return Object.assign({}, oldProps, { colorCounts: colorToCount });
  };
  
export default connect(mapStateToProps)(RemainingPiecesComponent);
  