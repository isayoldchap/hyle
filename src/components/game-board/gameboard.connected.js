import { connect } from 'react-redux';
import { squaresSelector, sizeSelector } from '../../ducks/boardDuck';
import { createSquareClickAction } from '../../actioncreators/boardActions';
import { GameBoard } from './game-board';

export const mapStateToProps = state => {
  return {
    boardSquares: squaresSelector(state),
    orderHalfMove: state.orderHalfMove,
    size: sizeSelector(state)
  };
};

const mapDispatchToProps = {
  squareClickHandler: createSquareClickAction
};

export const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);
