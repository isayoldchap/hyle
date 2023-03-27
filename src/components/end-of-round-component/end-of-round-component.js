import React from 'react';
import PropType from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export function EndOfRoundComponent({ handleStartNextRound }) {
  return (
    <div>
      <p>End of round</p>
      <RaisedButton secondary value="Start next round" label="Continue" onClick={handleStartNextRound} />
    </div>
  );
}

EndOfRoundComponent.defaultProps = {
  handleStartNextRound: () => {}
};

EndOfRoundComponent.propTypes = {
  handleStartNextRound: PropType.func
};
