import { App } from "./App";
import { connect } from "react-redux";
import { newGame } from '../../ducks/entropyDuck';

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { newGame }
)(App);