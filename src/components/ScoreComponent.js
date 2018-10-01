import React from "react";
import { connect } from "react-redux";
import scoreSelector from "../selectors/scoreSelector.js";

class ScoreComponent extends React.PureComponent {
  render() {
    const { score } = this.props;
    return <p>Current Score: {score}</p>;
  }
}

ScoreComponent.defaultProps = {
  score: 0
};

const mapStateToProps = state => {
  return {
    score: scoreSelector(state)
  };
};

export default connect(mapStateToProps)(ScoreComponent);
