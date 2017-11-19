import React from 'react';
import BoardSquare from './BoardSquare';
import ScoreComponent from './ScoreComponent';
import {connect} from 'react-redux';
import {scoreSelector} from '../selectors/scoreSelector';
import {squaresSelector, sizeSelector} from '../ducks/boardDuck'

class Board extends React.Component {

  componentDidMount() {
    const {squareHeight, dispatch} = this.props;
    document.getElementById('board').addEventListener("click", (event) => {
      const row = Math.ceil(event.offsetY / squareHeight);
      const col = Math.ceil(event.offsetX / squareHeight);
      dispatch(this.createSquareClickAction(row, col));
    });
  }

	render() {
    const {size, squareHeight, boardSquares = [], score = 0, orderHalfMove} = this.props;
    const squareContent = boardSquares.map(each => {
       const squareSelected = orderHalfMove ?
        (orderHalfMove.x === each.col && orderHalfMove.y === each.row) : false;
       return <BoardSquare {... each} width={squareHeight} height={squareHeight} showSelection={squareSelected}/>
    });

    return (
      <div>
    	  <canvas id="board" width={squareHeight*size} height={squareHeight*size}></canvas>
        {squareContent}
        <div>
          <ScoreComponent score={score} />
        </div>
      </div>
    );
	}

  createSquareClickAction (row, col) {
    return {
      type: 'squareClicked',
      payload: {
        row: row,
        col: col
      }
    };
  }
}

const mapStateToProps = (state) => {
  const newProps = {
    size: sizeSelector(state),
    boardSquares: squaresSelector(state),
    score: scoreSelector(state),
    orderHalfMove: state.orderHalfMove
  };
  return newProps;
};

export default connect(mapStateToProps)(Board);
