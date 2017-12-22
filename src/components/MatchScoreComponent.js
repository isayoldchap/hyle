import React from 'react';
import {connect} from 'react-redux';

class MatchScoreComponent extends React.Component {

  render() {
    return <div className="grid">
      <div className="row">
        <div className="col-lg-12">
          <p>Round 1:</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <p>Round 2:</p>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {

  return state;
};

export default connect(mapStateToProps)(MatchScoreComponent);
