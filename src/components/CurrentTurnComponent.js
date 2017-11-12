import React from 'react';
import {connect} from 'react-redux';
import {Roles} from '../reducers/gameReducer';
import NextTileComponent from './NextTileComponent';

class CurrentTurnComponent extends React.Component {

  render() {
    const {turn, dispatch} = this.props;
    if (turn === Roles.Chaos) {
      return <NextTileComponent height="75" width="75"/>;
    } else if (turn === Roles.Order){
      return (
        <div className="grid">
          <div className = "row">
            <p className = "col-md-2">Make a move or </p>
            <button className="col-md-2" onClick={() => dispatch(this.createPassAction())}>Pass</button>
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
  const computedProps = Object.assign({}, {turn: state.turn});
  return computedProps;
};

export default connect(mapStateToProps)(CurrentTurnComponent);
