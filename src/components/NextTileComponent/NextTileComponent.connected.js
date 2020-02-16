import { NextTileComponent } from "./NextTileComponent";
import { connect } from "react-redux";
import { selectNextTile } from "../../selectors/gameSelector.js";

const mapStateToProps = (state, oldProps) => {
  return Object.assign({}, oldProps, { nextTile: selectNextTile(state) });
};

export default connect(mapStateToProps)(NextTileComponent);
