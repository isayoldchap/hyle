import { NextTileComponent } from './next-tile-component';
import { connect } from 'react-redux';
import { selectNextTile } from '../../selectors/gameSelector';

const mapStateToProps = (state, oldProps) => {
  return { ...oldProps, nextTile: selectNextTile(state)};
};

export default connect(mapStateToProps)(NextTileComponent);
