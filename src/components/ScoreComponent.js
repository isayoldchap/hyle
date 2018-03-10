import React from 'react';

class ScoreComponent extends React.Component { 

  render() {
    const {score} = this.props;
    return (
      <p>Current Score: {score}</p>
    );
  }
}

ScoreComponent.defaultProps = {
	score: 0
};

export default ScoreComponent;