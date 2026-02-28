import { connect } from 'react-redux';
import { Lobby } from './lobby';
import { newGame, joinGame, requestOpenGames } from '../../ducks/entropyDuck';

const mapStateToProps = state => ({
  myRole: state.myRole,
  waitingForOpponent: state.waitingForOpponent,
  joinCode: state.joinCode,
  lobbyGames: state.lobbyGames || [],
});

const mapDispatchToProps = {
  createGame: newGame,
  joinGame,
  refreshGames: requestOpenGames,
};

export const ConnectedLobby = connect(mapStateToProps, mapDispatchToProps)(Lobby);
