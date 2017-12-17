import React from 'react';
import {connect} from 'react-redux';
import {Roles} from '../reducers/gameReducer';
import {createPassAction} from '../actioncreators/boardActions';
import NextTileComponent from './NextTileComponent';

class CurrentTurnComponent extends React.Component {

  render() {
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
      <div className="grid">
        <div className="row">
          <p className="col-md-3">Move number: {moveNumber}</p>
          <NextTileComponent className="col-md-3" height="75" width="75"/>
        </div>
      </div>
    );
  }

  renderOrder() {
    const {dispatch, moveNumber} = this.props;
    return (
      <div className="grid">
        <div className="row">
          <p className="col-lg-4">Move #: {moveNumber}</p>
          <p className="col-lg-4">Make a move or</p>
          <button className="col-lg-4" onClick={() => dispatch(createPassAction())}>Pass</button>
        </div>
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
