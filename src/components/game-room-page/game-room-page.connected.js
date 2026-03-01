import { connect } from 'react-redux';
import { GameRoomPage } from './game-room-page';
import { joinGame } from '../../ducks/entropyDuck';

const mapStateToProps = state => ({
  myRole: state.myRole,
  waitingForOpponent: state.waitingForOpponent,
  joinCode: state.joinCode,
});

const mapDispatchToProps = {
  joinGame,
};

export const ConnectedGameRoomPage = connect(mapStateToProps, mapDispatchToProps)(GameRoomPage);
