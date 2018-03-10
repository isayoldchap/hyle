import React from 'react';
import {connect} from 'react-redux';
import {nextTile} from '../selectors/gameSelector';
import PropType from 'prop-types';
import NextTileComponent from './NextTileComponent.js';

class NextTileContainer extends React.Component {
		
	render() {
		const {nextTile, width, height, visibleSlots} = this.props;
		return <NextTileComponent 
			nextTile={nextTile}
			width={width}
			height={height}
			visibleSlots={visibleSlots}
		/>;
	}
}

const mapStateToProps = (state, oldProps) => {
  return Object.assign({}, oldProps, {nextTile: nextTile(state)});
}

NextTileContainer.propTypes = {
  width: PropType.number,
  height: PropType.number,
  visibleSlots: PropType.number
};

export default connect(mapStateToProps)(NextTileContainer);