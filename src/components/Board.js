import React from 'react';
import BoardSquare from './BoardSquare';
import ScoreComponent from './ScoreComponent';
import {connect} from 'react-redux';
import {scoreSelector} from '../selectors/scoreSelector';
import {squaresSelector, sizeSelector} from '../selectors/boardSelectors'

class Board extends React.Component {

  componentDidMount() {
    const {squareHeight = 50, dispatch} = this.props;
    document.getElementById('board').addEventListener("click", (event) => {
      const row = Math.ceil(event.offsetX / squareHeight);
      const col = Math.ceil(event.offsetY / squareHeight);
      dispatch(this.createSquareClickAction(row, col));
    });
  }

	render() {
    const {size = 8, squareHeight = 50, boardSquares = [], score = 0} = this.props;

    const squareContent = boardSquares.map(each =>{
       const key = each.row + "," + each.column;
       return <BoardSquare {... each} width={squareHeight} height={squareHeight}/>
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
    score: scoreSelector(state)
  };
  return newProps;
}

export default connect(mapStateToProps)(Board);
