import { MatchScoreComponent} from "./MatchScoreComponent";
import { connect } from "react-redux";
import { selectPlayer1Name, selectPlayer1Score, selectPlayer2Name, selectPlayer2Score } from "../../selectors/gameSelector";

const mapStateToProps = state => {
    const player1Name = selectPlayer1Name(state);    
    const player1Score = selectPlayer1Score(state);
    const player2Name = selectPlayer2Name(state);
    const player2Score = selectPlayer2Score(state);
    return {
        player1Name, 
        player1Score, 
        player2Name, 
        player2Score
    };
};
  
export default connect(mapStateToProps)(MatchScoreComponent);