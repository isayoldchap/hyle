
import { BoardContainer } from "./BoardContainer";
import { squaresSelector, sizeSelector } from "../../selectors/boardSelector";
import { handleClick } from '../../reducers/entropyReducer';
import { connect } from "react-redux";

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
    { squareClickHandler: handleClick }
)(BoardContainer);