import React from 'react';

class ScoreComponent extends React.Component {

  render() {
    console.log("Props", this.props);
    const {score} = this.props;
    return (
      <p>Current Score: {score}</p>
    );
  }
}

export default ScoreComponent;
