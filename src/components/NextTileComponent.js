import React from 'react';
import {connect} from 'react-redux';
import {nextTile} from '../selectors/gameSelector';
import {renderPieceOnCanvas} from '../util/pieceRenderingUtil';
import Paper from 'material-ui/Paper';

class NextTileComponent extends React.Component {
  render() {
    const {width, height, visibleSlots} = this.props;
    return (
      <div>
        <p>Next Piece:</p>
        <canvas width={width} height = {height} id="nextTile"/>
      </div>  
    );
  }

  paintContents(){
    const canvas = document.getElementById('nextTile');
    const {width = 100, height = 100, piece} = this.props;
    renderPieceOnCanvas(canvas, 0, 0, width, piece);
  }

  componentDidUpdate(){
    this.paintContents();
  }

  componentDidMount() {
    this.paintContents();
  }
}

const mapStateToProps = (state, oldProps) => {
  return Object.assign({}, oldProps, {piece: nextTile(state)});
}

NextTileComponent.defaultProps = {
  width : 100,
  height : 100, 
  visibleSlots : 1
};

export default connect(mapStateToProps)(NextTileComponent);
