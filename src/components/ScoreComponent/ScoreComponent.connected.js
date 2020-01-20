import { connect } from "react-redux";
import selectScore from "../../selectors/scoreSelector";
import { ScoreComponent} from "./ScoreComponent";

const mapStateToProps = state => ({
    score: selectScore(state)
});
  
export default connect(mapStateToProps)(ScoreComponent);