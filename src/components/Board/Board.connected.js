import Board from './Board';
import { squaresSelector, sizeSelector } from '../../selectors/boardSelector';
import { handleClick } from '../../ducks/entropyDuck';
import { connect } from 'react-redux';
import { selectOrderHalfMove } from '../../selectors/gameSelector';

const mapStateToProps = state => {
  const newProps = {
    size: sizeSelector(state),
    boardSquares: squaresSelector(state),
    selectedSquare: selectOrderHalfMove(state)
  };
  return newProps;
};

export default connect(mapStateToProps, { squareClickHandler: handleClick })(
  Board
);
