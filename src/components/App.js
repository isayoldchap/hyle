import React from 'react';
import NewGameDialog from './NewGameDialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {newGame} from '../actioncreators/gameActions';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = 
      {
        showNewGameDialog: false,
        value: 5
      };
  }

  closeDialog(){
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
    const {dispatch} = this.props;
    this.closeDialog();
    dispatch(newGame(gameParams));
  }

  render() {
    return (
      <div>
         <AppBar title="Entropy"
               iconElementRight={<FlatButton label="New" />}
               onRightIconButtonClick={this.newGame.bind(this)}
               iconElementLeft={undefined}/>

          <NewGameDialog open={this.state.showNewGameDialog}
                         startAction={this.startGame.bind(this)}
                         closeAction={this.closeDialog.bind(this)} />

      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
