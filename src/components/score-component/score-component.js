import React from 'react';
import PropType from 'prop-types';

export function ScoreComponent({ score }) {
  return <p>Current Score: {score}</p>;
}

ScoreComponent.defaultProps = {
  score: 0
};

ScoreComponent.propTypes = {
  score: PropType.number
};
