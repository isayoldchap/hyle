import React from 'react';
import {renderPieceOnCanvas} from '../util/pieceRenderingUtil';

export default class BoardSquare extends React.Component {

	componentDidMount() {
		this.updateBoard();
	}

	componentDidUpdate(){
		this.updateBoard();
	}

	shouldComponentUpdate(newProps) {
		return true;
		// const returnval =  (this.props.color != newProps.color || this.props.showSelection != newProps.showSelection);
		// console.log("return val", returnval);
		// return returnval;
	}

	updateBoard(){
		const {col = 0, row = 0, width, height, color, canvasId = 'board', showSelection} = this.props;
		const x = (col * width) - width;
		const y = (row * height) - height;
    const boardCanvas = document.getElementById(canvasId);
    renderPieceOnCanvas(boardCanvas, x, y, width, color, true, showSelection);
	}

	render() {
		return null;
	}
}
