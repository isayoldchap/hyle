import {
  initializeBoard,
  placeTileOnBoard,
  moveTileOnBoard,
  allRowsAndColumns
} from '../util/boardUtils';
import { scoreCombo } from '../util/scoringUtils';
import { allLegalMoves } from '../util/moveUtils';
import { computeRemainingColorCounts, getGameColors } from '../util/colorUtils';
import { generateGamePieceSequence } from '../util/SequenceGenerator';

export const Roles = {
  ORDER: 'Order',
  CHAOS: 'Chaos'
};

const defaultGameConfig = {
  boardSize: 5,
  player1Name: 'Steve', // TODO make it so the enames  can be entered in the ew game dialog
  player2Name: 'Kip',
  liveScore: true
};

export const createEngine = (config = defaultGameConfig) => {
  let game = initializeGame(config);

  return {
    newGame: (config = defaultGameConfig) => {
      const mergedConfig = { ...game.config, ...config };
      game = initializeGame(mergedConfig);
      return game;
    },
    reset: () => {
      return game;
    },
    getState: () => {
      return reduxState(game);
    },
    playMove: move => {
      game = handleMove(game, move);
      return game;
    },
    advanceRound: () => {
      game = advanceRound(game);
      return game;
    }
  };
};

function reduxState(game) {
  return game;
}

function advanceRound(game) {
  let { player1Score, player2Score, round, config } = game;
  // if (game.roundInProgress) return game;

  const updatedGame = initializeGame(config);
  return {
    ...updatedGame,
    player1Score,
    player2Score,
    round: round + 1
  };
}

function handleMove(game, moveDefinition) {
  if (!game.roundInProgress) return game;

  const { turn } = game;
  if (turn === Roles.CHAOS) {
    return handleChaosMove(game, moveDefinition);
  } else if (turn === Roles.ORDER) {
    return handleOrderMove(game, moveDefinition);
  } else {
    return game;
  }
}

function handleChaosMove(game, { x, y }) {
  const previousBoardState = game.board;
  const nextPiece = game.nextPiece;

  const updatedBoard = placeTileOnBoard(previousBoardState, y, x, nextPiece);
  if (updatedBoard !== previousBoardState) {
    return completeTurn(game, updatedBoard);
  }
  return game;
}

function handleOrderMove(game, { pass = false, start, end }) {
  const boardState = game.board;
  if (pass) return completeTurn(game, boardState); // optimize later

  const updatedBoard = moveTileOnBoard(boardState, start, end);

  if (updatedBoard !== boardState) {
    return completeTurn(game, updatedBoard);
  }
  return game;
}

function completeTurn(game, updatedBoard) {
  const round = game.round;
  const newScore = computeScore(updatedBoard);
  const scoreKey = round === 1 ? 'player1Score' : 'player2Score';
  game[scoreKey] = newScore;

  const turn = game.turn === Roles.CHAOS ? Roles.ORDER : Roles.CHAOS;
  const legalMoves = allLegalMoves(turn, updatedBoard);

  let remainingColorCounts = game.remainingColorCounts;
  let remainingPieces = game.remainingPieces;
  let nextPiece = game.nextPiece;
  let roundInProgress = game.roundInProgress;
  let moveNumber = game.moveNumber;

  if (turn === Roles.CHAOS) {
    nextPiece = remainingPieces[0];
  } else {
    remainingPieces = remainingPieces.slice(1);
    remainingColorCounts = computeRemainingColorCounts(remainingPieces);
    moveNumber = moveNumber + 1;
    nextPiece = undefined;
  }

  return {
    ...game,
    turn,
    board: updatedBoard,
    legalMoves,
    score: newScore,
    moveNumber,
    nextPiece,
    remainingPieces,
    remainingColorCounts,
    roundInProgress
  };
}

function computeScore(board) {
  const allScoreablePatterns = allRowsAndColumns(board);

  const combinedScore = allScoreablePatterns.reduce((score, sequence) => {
    const patternToScore = sequence.map(characterForCell).join('');
    return score + scoreCombo(patternToScore.trim());
  }, 0);

  return combinedScore;
}

const characterForCell = cell => {
  return cell.color ? cell.color.substring(0, 1) : ' ';
};

const initializeGame = (config = defaultGameConfig) => {
  const boardSize = config.boardSize;
  const colors = getGameColors(boardSize);
  const board = initializeEntropyBoard(boardSize);
  const pieceSequence = generateGamePieceSequence(colors);
  const remainingColorCounts = computeRemainingColorCounts(pieceSequence);
  const legalMoves = allLegalMoves(Roles.CHAOS, board);

  const game = {
    config,
    round: 1,
    score: 0,
    turn: Roles.CHAOS,
    moveNumber: 1,
    roundInProgress: true,
    player1Score: 0,
    player2Score: 0,
    nextPiece: pieceSequence[0],
    remainingPieces: pieceSequence,
    remainingColorCounts,
    legalMoves: legalMoves,
    colors: colors,
    board
  };

  return game;
};

const makeEntropyCell = (row, column, color = undefined) => ({
  row: row,
  col: column,
  key: `${row}:${column}`,
  color: color
});

export const initializeEntropyBoard = size =>
  initializeBoard(size, makeEntropyCell);
