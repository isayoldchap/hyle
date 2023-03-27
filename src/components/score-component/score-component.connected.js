import { connect } from 'react-redux';
import { selectScore } from '../../selectors/gameSelector';
import { ScoreComponent } from './score-component';

const mapStateToProps = state => ({
  score: selectScore(state)
});

export default connect(mapStateToProps)(ScoreComponent);
