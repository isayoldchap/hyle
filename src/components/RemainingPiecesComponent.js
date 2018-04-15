import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {renderPieceOnCanvas, renderBackground} from '../util/pieceRenderingUtil';
import {remainingColorCounts, colors} from '../selectors/gameSelector';

class RemainingPiecesComponent extends React.Component {
  render() {
    const {width, colorCounts, orientation} = this.props;
    const canvasContent = (orientation === RemainingPiecesComponentOrientation.VERTICAL) ? <canvas id="remaining pieces" width={width} height={width*colorCounts.length} /> : <canvas id="remaining pieces" width={width*colorCounts.length} height={width} />;

    return (
      <div> 
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

  dimensions() {
    const {width, colorCounts, orientation} = this.props;
    if (orientation === RemainingPiecesComponentOrientation.VERTICAL) {
      return {width: width, height: width * colorCounts.length};
    } else if (orientation === RemainingPiecesComponentOrientation.HORIZONTAL) {
      return {width: width * colorCounts.length, height: width};
    } 
  }

  repaintRemainingComponents(){
    const {width, colorCounts, orientation} = this.props;
    const canvas = document.getElementById("remaining pieces");

    const dimensions = this.dimensions();
    renderBackground(canvas, dimensions.width, dimensions.height, "white");

    colorCounts.filter((colorCount) => colorCount.count > 0).forEach((colorCount, index) => {
      if (orientation === RemainingPiecesComponentOrientation.VERTICAL) {
        renderPieceOnCanvas(canvas, 0, index*width, width, colorCount.color, false, false, colorCount.count);
      } else {
        renderPieceOnCanvas(canvas, index*width, 0, width, colorCount.color, false, false, colorCount.count);
      }
    });
  }
}

export const RemainingPiecesComponentOrientation = {
  HORIZONTAL : "horizontal",
  VERTICAL : "vertical"
};

RemainingPiecesComponent.propTypes = {
  width: PropTypes.number,
  colorCounts: PropTypes.array,
  orientation: PropTypes.string
};

RemainingPiecesComponent.defaultProps = {
  width : 50, 
  colorCounts : [], 
  orientation : RemainingPiecesComponentOrientation.HORIZONTAL
};

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

export default connect(mapStateToProps)(RemainingPiecesComponent);
