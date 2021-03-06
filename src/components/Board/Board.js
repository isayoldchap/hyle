import React from 'react';
import BoardSquare from '../BoardSquare/BoardSquare';
import PropTypes from 'prop-types';

class Board extends React.Component {
  componentDidMount() {
    const { squareHeight, squareClickHandler } = this.props;
    document.getElementById('board').addEventListener('click', event => {
      const row = Math.ceil(event.offsetY / squareHeight);
      const col = Math.ceil(event.offsetX / squareHeight);
      squareClickHandler(col, row);
    });
  }

  render() {
    const { size, squareHeight, boardSquares, selectedSquare } = this.props;

    const squareContent = boardSquares.map(each => {
      const isSelected = selectedSquare
        ? selectedSquare.x === each.col && selectedSquare.y === each.row
        : false;
      return (
        <BoardSquare
          {...each}
          key={each.key}
          width={squareHeight}
          height={squareHeight}
          isSelected={isSelected}
        />
      );
    });

    return (
      <div>
        <canvas
          id="board"
          width={squareHeight * size}
          height={squareHeight * size}
        />
        {squareContent}
      </div>
    );
  }
}

Board.defaultProps = {
  squareHeight: 80,
  boardSquares: [],
  selectedSquare: undefined
};

Board.propTypes = {
  squareClickHandler: PropTypes.func,
  squareHeight: PropTypes.number,
  size: PropTypes.number,
  boardSquares: PropTypes.array,
  selectedSquare: PropTypes.object
};

export default Board;
