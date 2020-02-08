import {App} from "./App";
import { connect } from "react-redux";
import { newGame } from "../../reducers/newGameReducer";

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { newGame }
)(App);