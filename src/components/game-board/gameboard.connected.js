import { connect } from 'react-redux';
import { GameBoard } from './game-board';
import { squaresSelector, sizeSelector } from '../../selectors/boardSelector';
import {
  selectIsEndOfRound,
  selectIsGameOver,
  selectMoveNumber,
  selectRoundNumber,
  selectTurn,
  selectWinning,
  selectNextTile,
  selectLegalMoves,
  selectOrderHalfMove
} from '../../selectors/gameSelector';
import { advanceRound, newGame, handlePass, handleMovePiece } from '../../ducks/entropyDuck';
import { createBackAction } from '../../actioncreators/historyActions';

export const mapStateToProps = state => {
  return {
    cells: squaresSelector(state),
    orderHalfMove: state.orderHalfMove,
    size: sizeSelector(state),
    roundNumber: selectRoundNumber(state),
    turn: selectTurn(state),
    moveNumber: selectMoveNumber(state),
    endOfRound: selectIsEndOfRound(state),
    endOfGame: selectIsGameOver(state),
    winner: selectWinning(state),
    nextTile: selectNextTile(state),
    legalMoves: selectLegalMoves(state),
    selectedSquare: selectOrderHalfMove(state)
  };
};

const mapDispatchToProps = {
  back: createBackAction,
  movePiece: handleMovePiece,
  pass: handlePass,
  startNewGame: newGame,
  startNextRound: advanceRound
};

export const ConnectedGameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoard);
