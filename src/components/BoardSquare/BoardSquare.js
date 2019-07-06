import React from "react";
import { renderPieceOnCanvas } from "../../util/pieceRenderingUtil";

export default class BoardSquare extends React.Component {
  componentDidMount() {
    this.updateSquare();
  }

  componentDidUpdate() {
    this.updateSquare();
  }

  updateSquare() {
    const {
      col = 0,
      row = 0,
      width,
      height,
      color,
      canvasId = "board",
      showSelection
    } = this.props;
    const x = col * width - width;
    const y = row * height - height;
    const boardCanvas = document.getElementById(canvasId);
    renderPieceOnCanvas(boardCanvas, x, y, width, color, true, showSelection);
  }

  render() {
    return null;
  }
}
