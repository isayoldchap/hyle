import React from 'react';
import {connect} from 'react-redux';
import {nextTile} from '../selectors/gameSelector';
import {renderPieceOnCanvas} from '../util/pieceRenderingUtil';

class NextTileComponent extends React.Component {
  render() {
    const {width = 100, height = 100, visibleSlots=1} = this.props;
    return (
      <div align="center">
        <p>Next:</p>
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

export default connect(mapStateToProps)(NextTileComponent);
