import React from "react";
import { renderPieceOnCanvas } from "../../util/pieceRenderingUtil";
import PropType from "prop-types";

export class NextTileComponent extends React.Component { 
  render() {
    const { width, height } = this.props;
    return (
      <div>
        <p>Next Piece:</p>
        <canvas width={width} height={height} id="nextTile" />
      </div>
    );
  }

  paintContents() {
    const canvas = document.getElementById("nextTile");
    const { width = 100, nextTile } = this.props;
    renderPieceOnCanvas(canvas, 0, 0, width, nextTile);
  }

  componentDidUpdate() {
    this.paintContents();
  }

  componentDidMount() {
    this.paintContents();
  }
}

NextTileComponent.defaultProps = {
  width: 100,
  height: 100,
  visibleSlots: 1
};

NextTileComponent.propTypes = {
  nextTile: PropType.string,
  width: PropType.number,
  height: PropType.number,
  visibleSlots: PropType.number
};

