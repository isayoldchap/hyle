import React from 'react'

export default class BoardSquare extends React.Component {

	componentDidMount() {
		this.updateBoard();
	}

	updateBoard(){
		const {col, row, width, height, color} = this.props;
		const x = (col * width) - width;
		const y = (row * height) - height;
		const ctx = document.getElementById('board').getContext('2d');
    const pieceColor = color == undefined ? 'white' : color;

		ctx.imageSmoothingEnabled = true;
		ctx.fillStyle="white";
		ctx.fillRect(x+1,y+1, width-2, height-2);
		ctx.strokeStyle = "rgb(200,200,200";
    ctx.strokeRect(x,y, width, height);
    
    var grd=ctx.createRadialGradient(x+width/2,y+width/2,width,x, y, 0);
		grd.addColorStop(0, pieceColor);
		grd.addColorStop(1, 'white');

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x+(width/2), y+(height/2), width * .45, 0, Math.PI * 2, true); // Outer circle
    ctx.fillStyle=grd;
		ctx.fill();
		ctx.closePath();
	}

	render() {
		return null;
	}
}
