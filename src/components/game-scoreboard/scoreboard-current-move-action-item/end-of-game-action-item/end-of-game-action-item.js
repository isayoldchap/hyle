import React from 'react';
import PropTypes from 'prop-types';
import NewGameDialog from '../../../new-game-dialog/new-game-dialog';

export class EndOfGameActionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  openDialog() {
    this.setState({ dialogOpen: true });
  }

  closeDialog() {
    this.setState({ dialogOpen: false });
  }

  handleStart(options) {
    const { startNewGame } = this.props;
    this.closeDialog();
    startNewGame(options);
  }

  render() {
    const { winner, previousConfig } = this.props;
    const { dialogOpen } = this.state;

    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '0.2rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          Game Over
        </p>
        <p style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
          {winner} won!
        </p>
        <button type="button" onClick={this.openDialog} className="btn">
          Play Again
        </button>
        <NewGameDialog
          open={dialogOpen}
          startAction={this.handleStart}
          closeAction={this.closeDialog}
          initialValues={previousConfig}
        />
      </div>
    );
  }
}

EndOfGameActionItem.propTypes = {
  startNewGame: PropTypes.func,
  winner: PropTypes.string,
  previousConfig: PropTypes.shape({
    showLiveScore: PropTypes.bool,
    showGridLines: PropTypes.bool,
    boardSize: PropTypes.number,
    playAgainstAI: PropTypes.bool
  })
};

EndOfGameActionItem.defaultProps = {
  startNewGame: () => {},
  winner: null,
  previousConfig: {}
};
