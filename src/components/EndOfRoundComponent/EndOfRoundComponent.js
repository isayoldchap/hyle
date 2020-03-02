import React from 'react';
import PropType from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export class EndOfRoundComponent extends React.Component {
  render() {
    const { handleStartNextRound } = this.props;
    return (
      <div>
        <p>End of round</p>
        <RaisedButton
          secondary={true}
          value={'Start next round'}
          label={'Continue'}
          onClick={handleStartNextRound}
        />
      </div>
    );
  }
}

EndOfRoundComponent.defaultProps = {
  handleStartNextRound: () => {}
};

EndOfRoundComponent.propTypes = {
  handleStartNextRound: PropType.func
};
