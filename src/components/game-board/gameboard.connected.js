import { connect } from 'react-redux';
import { GameBoard } from './game-board';
import { squaresSelector, sizeSelector } from '../../selectors/boardSelector';
import { selectTurn, selectLegalMoves } from '../../selectors/gameSelector';
import { handleMovePiece } from '../../ducks/entropyDuck';

export const mapStateToProps = state => {
  return {
    cells: squaresSelector(state),
    legalMoves: selectLegalMoves(state),
    size: sizeSelector(state),
    turn: selectTurn(state)
  };
};

const mapDispatchToProps = {
  movePiece: handleMovePiece
};

export const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);
