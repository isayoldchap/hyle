
import React from 'react';
import {connect} from 'react-redux';
import RemainingPiecesComponent from './RemainingPiecesComponent';
import {remainingColorCounts, colors} from '../selectors/gameSelector';

class RemainingPiecesContainer extends React.Component {
    render() {
        const {width, colorCounts, orientation} = this.props;
        return <RemainingPiecesComponent 
            width={width}
            colorCounts={colorCounts}
            orientation={orientation}
        />;
    }
}


const mapStateToProps = (state, oldProps) => {
    const theColors = colors(state);
    const remainingCounts = remainingColorCounts(state);
  
    const colorToCount = theColors.map((color) => {
      const foundColor = remainingCounts.find((each) => {
        return color === each.color;
      });
      const count = foundColor ? foundColor.count : 0;
      return {color: color, count: count};
    });
  
    return Object.assign({}, oldProps, {colorCounts: colorToCount});
};

export default connect(mapStateToProps)(RemainingPiecesContainer);

