import PropTypes from 'prop-types';
import React from 'react';
import NewGameDialog from '../NewGameDialog/NewGameDialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewGameDialog: false,
      value: 5
    };
  }

  closeDialog() {
    this.setState({
      showNewGameDialog: false
    });
  }

  newGame() {
    this.setState({
      showNewGameDialog: true
    });
  }

  startGame(gameParams) {
    const { newGame } = this.props;
    this.closeDialog();
    newGame(gameParams);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Entropy"
          iconElementRight={<FlatButton label="New" />}
          onRightIconButtonClick={this.newGame.bind(this)}
          iconElementLeft={undefined}
        />

        <NewGameDialog
          open={this.state.showNewGameDialog}
          startAction={this.startGame.bind(this)}
          closeAction={this.closeDialog.bind(this)}
        />
      </div>
    );
  }
}

App.propTypes = {
  newGame: PropTypes.func.isRequired
};
