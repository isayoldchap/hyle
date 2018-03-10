import {connect} from 'react-redux';
import React from 'react';
import CurrentTurnComponent from './CurrentTurnComponent';

class CurrentTurnContainer extends React.Component {
	render() {
		const {turn, moveNumber, endOfRound} = this.props;
		return 
			<CurrentTurnComponent 
				turn = {turn}
				moveNumber = {moveNumber}
				endOfRound = {endOfRound}
			/>;
	}
}

const mapStateToProps = (state) => {
	return {
		turn: turn(state), 
	  moveNumber: moveNumber(state),
		endOfRound: endOfRound(state)
	};	
};

export default connect(mapStateToProps)(CurrentTurnContainer);
