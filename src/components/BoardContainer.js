import React from "react";
import { connect } from "react-redux";
import Board from "./Board";
import { squaresSelector, sizeSelector } from "../ducks/boardDuck";
import { createSquareClickAction } from "../actioncreators/boardActions";

class BoardContainer extends React.Component {
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

const mapStateToProps = state => {
  const newProps = {
    size: sizeSelector(state),
    boardSquares: squaresSelector(state),
    orderHalfMove: state.orderHalfMove
  };
  return newProps;
};

export default connect(
  mapStateToProps,
  { squareClickHandler: createSquareClickAction }
)(BoardContainer);
