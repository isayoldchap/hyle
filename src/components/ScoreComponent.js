import React from 'react';

class ScoreComponent extends React.Component {

  render() {
    return (
      <p>Current Score: {this.props.score}</p>
    );
  }
}

export default ScoreComponent;
