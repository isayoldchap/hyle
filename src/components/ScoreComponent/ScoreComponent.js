import React from "react";

export class ScoreComponent extends React.PureComponent {
  render() {
    const { score } = this.props;
    return <p>Current Score: {score}</p>;
  }
}

ScoreComponent.defaultProps = {
  score: 0
};