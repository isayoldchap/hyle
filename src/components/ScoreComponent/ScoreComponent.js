import React from "react";
import PropType from "prop-types";

export class ScoreComponent extends React.PureComponent {
  render() {
    const { score = 0 } = this.props;
    return <p>Current Score: {score}</p>;
  }
}

ScoreComponent.propTypes = {
  score: PropType.number
};
