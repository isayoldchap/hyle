import React from 'react';
import {connect} from 'react-redux';
import ScoreComponent from './ScoreComponent';
import scoreSelector from '../selectors/scoreSelector';

class ScoreContainer extends React.Component {
	render() {
		const {score} = this.props;	
		return <ScoreComponent score={score}/>
	}
}

const mapStateToProps = (state) => {
	return { 
		score: scoreSelector(state)
	};
};


export default connect(mapStateToProps)(ScoreContainer);