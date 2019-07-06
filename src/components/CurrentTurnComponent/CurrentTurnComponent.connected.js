import { connect } from "react-redux";
import { selectMoveNumber, selectTurn, selectIsEndOfRound } from "../../selectors/gameSelector";
import { createPassAction } from "../../actioncreators/boardActions";
import { createBackAction } from "../../actioncreators/historyActions";
import { nextRound } from "../../actioncreators/gameActions";
import { CurrentTurnComponent} from "./CurrentTurnComponent";


const mapStateToProps = state => {
    const computedProps = Object.assign(
      {},
      {
        turn: selectTurn(state),
        moveNumber: selectMoveNumber(state),
        endOfRound: selectIsEndOfRound(state)
      }
    );
    return computedProps;
  };
  
export default connect(
    mapStateToProps,
    { startNextRound: nextRound, back: createBackAction, pass: createPassAction }
)(CurrentTurnComponent);