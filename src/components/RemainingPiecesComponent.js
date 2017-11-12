import React, { Component } from 'react'
import {connect} from 'react-redux';

class RemainingPiecesComponent extends Component{
  render() {
    const {width, colorCounts} = this.props;
    return (
      <div style={{float:"left"}}>
        <p>Remaining Pieces</p>
        <canvas id="remaining pieces" width="50" height = "250"/>
      </div>
    );
  }
}

const mapStateToProps = (state, oldProps) => {

  return state;
}

export default connect(mapStateToProps)(RemainingPiecesComponent);
