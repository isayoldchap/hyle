import React from 'react';
import BoardSquare from './BoardSquare';
import {withSize} from './WithSize';

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
    const {size, squareHeight, boardSquares, orderHalfMove} = this.props;
    const squareContent = boardSquares.map(each => {
       const squareSelected = orderHalfMove ?
        (orderHalfMove.x === each.col && orderHalfMove.y === each.row) : false;
       return <BoardSquare {... each} width={squareHeight} height={squareHeight} showSelection={squareSelected}/>
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
  size: 5,
  squareHeight: 75,
  boardSquares: [],
  orderHalfMove: undefined
};

export default Board;
