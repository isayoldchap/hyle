import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropType from 'prop-types';

class NewGameDialog extends React.Component {
  constructor(props) {
    super(props);

    this.toggleGridLines = this.toggleGridLines.bind(this);
    this.toggleLiveScore = this.toggleLiveScore.bind(this);

    this.state = {
      showLiveScore: true,
      showGridLines: true,
      boardSize: 5
    };
  }

  render() {
    const { closeAction, open } = this.props;
    const { showLiveScore, showGridLines, boardSize } = this.state;

    const styles = {
      block: {
        maxWidth: 250
      },
      toggle: {
        fontWeight: 'normal',
        marginBottom: 16
      },
      thumbOff: {
        backgroundColor: '#ffcccc'
      },
      trackOff: {
        backgroundColor: '#ff9d9d'
      },
      thumbSwitched: {
        backgroundColor: 'red'
      },
      trackSwitched: {
        backgroundColor: '#ff9d9d'
      },
      labelStyle: {
        color: 'red'
      }
    };

    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={closeAction} key="Cancel" />,

      <FlatButton label="Ok" key="Ok" primary={true} disabled={false} onClick={this.handleOk.bind(this)} />
    ];

    return (
      <Dialog open={open} actions={actions}>
        <p align="center">New Game Options</p>

        <SelectField value={boardSize} onChange={this.handleChange.bind(this)} floatingLabelText="Preferred Board Size">
          <MenuItem value={3} label="3 x 3" primaryText="Small" />
          <MenuItem value={5} label="5 x 5" primaryText="Medium" />
          <MenuItem value={7} label="7 x 7" primaryText="Large" />
          <MenuItem value={9} label="9 x 9" primaryText="X-Large" />
        </SelectField>

        <Toggle label="Show Live Score" toggled={showLiveScore} onToggle={this.toggleLiveScore} style={styles.toggle} />
        <Toggle label="Show Grid Lines" toggled={showGridLines} onToggle={this.toggleGridLines} style={styles.toggle} />
      </Dialog>
    );
  }

  handleOk() {
    const { startAction } = this.props;
    startAction(this.state);
  }

  toggleLiveScore(event, value) {
    this.setState({
      showLiveScore: value
    });
  }

  toggleGridLines(event, value) {
    this.setState({
      showGridLines: value
    });
  }

  handleChange(event, index, value) {
    this.setState({
      boardSize: value
    });
  }
}

NewGameDialog.propTypes = {
  closeAction: PropType.func.isRequired,
  open: PropType.bool.isRequired,
  startAction: PropType.func.isRequired
};

export default NewGameDialog;
