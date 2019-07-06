import React from "react";
import Board from "../Board/Board";

export class BoardContainer extends React.Component {
  render() {
    const {
      size,
      boardSquares,
      orderHalfMove,
      squareClickHandler
    } = this.props;
    return (
      <Board
        size={size}
        boardSquares={boardSquares}
        selectedSquare={orderHalfMove}
        squareClickHandler={squareClickHandler}
      />
    );
  }
}

