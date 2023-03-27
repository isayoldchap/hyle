import { initializeBoard, placeTileOnBoard, moveTileOnBoard, allRowsAndColumns } from '../util/boardUtils';
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
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  liveScore: true
};

const makeEntropyCell = (row, column, color = undefined) => ({
  row,
  col: column,
  key: `${row}:${column}`,
  color
});

export const initializeEntropyBoard = size => initializeBoard(size, makeEntropyCell);

const initializeGame = (config = defaultGameConfig) => {
  const { boardSize } = config;
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
    legalMoves,
    colors,
    board
  };

  return game;
};

const characterForCell = cell => {
  return cell.color ? cell.color.substring(0, 1) : ' ';
};

function computeScore(board) {
  const allScoreablePatterns = allRowsAndColumns(board);

  const combinedScore = allScoreablePatterns.reduce((score, sequence) => {
    const patternToScore = sequence.map(characterForCell).join('');
    return score + scoreCombo(patternToScore.trim());
  }, 0);

  return combinedScore;
}

function completeTurn(game, updatedBoard) {
  const newScore = computeScore(updatedBoard);

  const turn = game.turn === Roles.CHAOS ? Roles.ORDER : Roles.CHAOS;
  const legalMoves = allLegalMoves(turn, updatedBoard);

  const { round } = game;
  let { moveNumber, remainingColorCounts, remainingPieces } = game;
  let nextPiece;

  if (turn === Roles.CHAOS) {
    [nextPiece] = remainingPieces;
  } else {
    remainingPieces = remainingPieces.slice(1);
    remainingColorCounts = computeRemainingColorCounts(remainingPieces);
    moveNumber += 1;
  }

  const scoreKey = round === 1 ? 'player2Score' : 'player1Score';

  return {
    ...game,
    [scoreKey]: newScore,
    turn,
    board: updatedBoard,
    legalMoves,
    score: newScore,
    moveNumber,
    nextPiece,
    remainingPieces,
    remainingColorCounts
  };
}

function reduxState(game) {
  return game;
}

function advanceRound(game) {
  const { player1Score, player2Score, round, config } = game;

  const updatedGame = initializeGame(config);
  return {
    ...updatedGame,
    player1Score,
    player2Score,
    round: round + 1
  };
}

function handleChaosMove(game, { x, y }) {
  const previousBoardState = game.board;
  const { nextPiece } = game;

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

function handleMove(game, moveDefinition) {
  if (!game.roundInProgress) return game;

  const { turn } = game;
  if (turn === Roles.CHAOS) {
    return handleChaosMove(game, moveDefinition);
  }
  if (turn === Roles.ORDER) {
    return handleOrderMove(game, moveDefinition);
  }
  return game;
}

export const createEngine = (config = defaultGameConfig) => {
  let game = initializeGame(config);

  return {
    newGame: (newGameConfig = defaultGameConfig) => {
      const mergedConfig = { ...game.config, ...newGameConfig };
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
