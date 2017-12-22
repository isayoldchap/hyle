import React from 'react'
import {connect} from 'react-redux';
import {remainingColorCounts, colors} from '../selectors/gameSelector';
import {renderPieceOnCanvas} from '../util/pieceRenderingUtil';
import {withSize} from './WithSize';

class RemainingPiecesComponent extends React.Component {
  render() {
    const {width, colorCounts, orientation} = this.props;
    const canvasContent = (orientation === RemainingPiecesComponentOrientation.VERTICAL) ? <canvas id="remaining pieces" width={width} height={width*colorCounts.length} /> : <canvas id="remaining pieces" width={width*colorCounts.length} height={width} />;

    return (
      <div style={{float:"left", horiznontalalignment:"right"}}>
        {canvasContent}
      </div>
    );
  }

  componentDidMount(){
    this.repaintRemainingComponents();
  }

  componentDidUpdate(){
    this.repaintRemainingComponents();
  }

  repaintRemainingComponents(){
    const {width, colorCounts, orientation} = this.props;
    const canvas = document.getElementById("remaining pieces");
    colorCounts.forEach((colorCount, index) => {
      if (orientation === RemainingPiecesComponentOrientation.VERTICAL) {
        renderPieceOnCanvas(canvas, 0, index*width, width, colorCount.color, false, false, colorCount.count);
      } else {
        renderPieceOnCanvas(canvas, index*width, 0, width, colorCount.color, false, false, colorCount.count);
      }
    });
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

export const RemainingPiecesComponentOrientation = {
  HORIZONTAL : "horizontal",
  VERTICAL : "vertical"
};

// RemainingPiecesComponent.propTypes = {
//   width: React.PropTypes.number,
//   colorCounts: React.PropTypes.array,
//   orientation: React.PropTypes.string
// };

// RemainingPiecesComponent.defaultProps = {
//   width : 50, 
//   colorCounts : [], 
//   orientation : RemainingPiecesComponentOrientation.HORIZONTAL
// };

export default connect(mapStateToProps) (RemainingPiecesComponent);
