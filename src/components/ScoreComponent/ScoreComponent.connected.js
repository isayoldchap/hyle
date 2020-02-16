import { connect } from "react-redux";
import { selectScore } from "../../selectors/gameSelector";
import { ScoreComponent } from "./ScoreComponent";

const mapStateToProps = state => ({
  score: selectScore(state)
});

export default connect(mapStateToProps)(ScoreComponent);
