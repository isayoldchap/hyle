import React from 'react';
import PropType from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export function EndOfGameComponent({ handleStartNewGame, winner }) {
  return (
    <div>
      <p>Game Over!</p>
      <p>{winner} won</p>
      <RaisedButton secondary value="StartNewGame" label="Start New Game" onClick={handleStartNewGame} />
    </div>
  );
}

EndOfGameComponent.defaultProps = {
  handleStartNewGame: () => {}
};

EndOfGameComponent.propTypes = {
  handleStartNewGame: PropType.func,
  winner: PropType.string.isRequired
};
