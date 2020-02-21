import { connect } from 'react-redux';
import { GameBoard } from './game-board';
import { squaresSelector, sizeSelector } from '../../selectors/boardSelector';

export const mapStateToProps = state => {
  return {
    boardSquares: squaresSelector(state),
    orderHalfMove: state.orderHalfMove,
    size: sizeSelector(state)
  };
};

const mapDispatchToProps = undefined;

export const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);
