import React from 'react';
import {connect} from 'react-redux';
import {Roles} from '../reducers/gameReducer';
import NextTileComponent from './NextTileComponent';

class CurrentTurnComponent extends React.Component {

  render() {
    const {turn, dispatch, moveNumber} = this.props;
    if (turn === Roles.Chaos) {
      return (
        <div className="grid">
          <div className="row">
            <p className="col-md-3">Move number: {moveNumber}</p>
            <NextTileComponent className="col-md-3" height="75" width="75"/>
          </div>
        </div>
      );
    } else if (turn === Roles.Order){
      return (
        <div className="grid">
          <div className="row">
            <p className="col-lg-4">Move #: {moveNumber}</p>
            <p className="col-lg-4">Make a move or</p>
            <button className="col-lg-4" onClick={() => dispatch(this.createPassAction())}>Pass</button>
          </div>
        </div>
      );
    } else return <p>what</p>;
  }

  createPassAction(){
    return {type: "pass", payload: undefined};
  }
}

const mapStateToProps = (state) => {
  const computedProps = Object.assign(
    {},{turn: state.turn}, {moveNumber: state.moveNumber});
  return computedProps;
};

export default connect(mapStateToProps)(CurrentTurnComponent);
