import { connect } from "react-redux";
import {
  selectMoveNumber,
  selectWinning,
  selectTurn,
  selectIsEndOfRound,
  selectIsGameOver,
  selectRoundNumber
} from "../../selectors/gameSelector";
import { createBackAction } from "../../actioncreators/historyActions";
import { advanceRound, newGame } from "../../ducks/entropyDuck";
import { CurrentTurnComponent } from "./CurrentTurnComponent";
import { handlePass } from "../../ducks/entropyDuck";

const mapStateToProps = state => ({
  roundNumber: selectRoundNumber(state),
  turn: selectTurn(state),
  moveNumber: selectMoveNumber(state),
  endOfRound: selectIsEndOfRound(state),
  endOfGame: selectIsGameOver(state),
  winner: selectWinning(state)
});

export default connect(mapStateToProps, {
  startNextRound: advanceRound,
  startNewGame: newGame,
  back: createBackAction,
  pass: handlePass
})(CurrentTurnComponent);
