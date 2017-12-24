import React from 'react';
import BoardSquare from './BoardSquare';
import {withSize} from './WithSize';
import PropTypes from 'prop-types';

class Board extends React.Component {

  componentDidMount() {
    const {squareHeight, squareClickHandler} = this.props;
    document.getElementById('board').addEventListener("click", (event) => {
      const row = Math.ceil(event.offsetY / squareHeight);
      const col = Math.ceil(event.offsetX / squareHeight);
      squareClickHandler(row, col);
    });
  }

	render() {
    const {size, squareHeight, boardSquares, selectedSquare} = this.props;
    const squareContent = boardSquares.map(each => {
       const isSquareSelected = selectedSquare ?
        (selectedSquare.x === each.col && selectedSquare.y === each.row) : false;
       return <BoardSquare {... each} width={squareHeight} height={squareHeight} showSelection={isSquareSelected}/>
    });

    return (
      <div>        
    	  <canvas id="board" width={squareHeight*size} height={squareHeight*size}></canvas>
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
  size: PropTypes.number
};

export default Board;
