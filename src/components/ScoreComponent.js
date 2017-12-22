import React from 'react';

class ScoreComponent extends React.Component { 

  render() {
    console.log("React prop types", React);
    const {score} = this.props.score;
    return (
      <p>Current Score: {score}</p>
    );
  }
}

ScoreComponent.defaultProps = {
	score: 0
};


export default ScoreComponent;
