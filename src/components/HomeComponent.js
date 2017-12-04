import React from 'react';
import {Link} from 'react-router-dom';

class HomeComponent extends React.Component {
  render() {
    return (
      <div>
        <Link to="newGame">New Game</Link>
      </div>
    );
  }
}

export default HomeComponent;
