import React from 'react';
import {connect} from 'react-redux';
import MatchScoreComponent from './MatchScoreComponent.js';

class MatchScoreContainer extends React.Component {

  render() {
    return <MatchScoreComponent />
  }
}

const mapStateToProps = (state) => {

  return state;
};

export default connect(mapStateToProps)(MatchScoreComponent);
