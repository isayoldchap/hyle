import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {Roles} from '../reducers/gameReducer';
import {createPassAction} from '../actioncreators/boardActions';
import NextTileComponent from './NextTileComponent';
import Paper from 'material-ui/Paper';

class CurrentTurnComponent extends React.Component {

  render() {
    const {moveNumber} = this.props;
    return (
      <div>
        <p>Move number: {moveNumber}</p>
        {this.renderRoleSpecificContent()}
      </div>
    );
  }

  renderRoleSpecificContent() {
    const {turn} = this.props;

    if (turn === Roles.Chaos) {
      return this.renderChaos();
    } else if (turn === Roles.Order){
      return this.renderOrder();
    } else return undefined;
  }

  renderChaos() {
    const {dispatch, moveNumber} = this.props;
    return (
      <div>
        <h3>Chaos</h3>
        <NextTileComponent height="75" width="75"/>
      </div>
    );
  }

  renderOrder() {
    const {dispatch, moveNumber} = this.props;
    return (
      <div>
        <h3>Order</h3>
        <p>Make a move or </p>
        <RaisedButton
          label="Pass"
          primary={true}
          onClick={() => dispatch(createPassAction())}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const computedProps = Object.assign(
    {},{turn: state.turn}, {moveNumber: state.moveNumber});
  return computedProps;
};

export default connect(mapStateToProps)(CurrentTurnComponent);
