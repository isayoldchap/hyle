import { initializeBoard, placeTileOnBoard, moveTileOnBoard, allRowsAndColumns } from "../board";
import { scoreCombo } from "../util/scorer";
import { allLegalMoves } from "../util/boardUtils";
import { computeRemainingColorCounts, getGameColors } from "../util/colorUtils";
import { generateGamePieceSequence } from "../util/SequenceGenerator";

export const Roles = {
    ORDER : "Order",
    CHAOS: "Chaos"
};

const DEFAULT_GAME_OPTIONS = {
    boardSize: 5
};

export const createEngine = (boardSize = 5) => {
    let game = initializeGame(boardSize);

    return ({
        newGame: (options = DEFAULT_GAME_OPTIONS) => {
            const {boardSize} = options;
            game = initializeGame(boardSize);
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
        }
    });
}

function reduxState(game) {
    return game;
};

function handleMove(game, moveDefinition) {
    if (!game.roundInProgress) return game;
    
    const {turn} = game;
    if (turn === Roles.CHAOS) {
        return handleChaosMove(game, moveDefinition);
    } else if (turn === Roles.ORDER) {
        return handleOrderMove(game, moveDefinition);
    } else {
        return game;
    }
}

function handleChaosMove(game, {x, y}) {
    const previousBoardState = game.board;
    const nextPiece = game.nextPiece;

    const updatedBoard = placeTileOnBoard(previousBoardState, y, x, nextPiece);
    if (updatedBoard !== previousBoardState ) {
        return completeTurn(game, updatedBoard);
    }
    return game;
}

function handleOrderMove(game, {pass = false, start, end}) {
    const boardState = game.board;
    if (pass) return completeTurn(game, boardState); // optimize later

    const updatedBoard = moveTileOnBoard(boardState, start, end);

    if (updatedBoard !== boardState ) {
        return completeTurn(game, updatedBoard);
    }
    return game;
}

function completeTurn(game, updatedBoard) {
    const newScore = computeScore(updatedBoard);
    const turn = (game.turn === Roles.CHAOS) ? Roles.ORDER : Roles.CHAOS;
    const legalMoves = allLegalMoves(turn, updatedBoard);

    let remainingColorCouunts = game.remainingColorCouunts;
    let remainingPieces = game.remainingPieces;
    let nextPiece = game.nextPiece;
    let roundInProgress = game.roundInProgress;
    let moveNumber = game.moveNumber;
    
    if (turn === Roles.CHAOS) {
        nextPiece = remainingPieces[0];
    } else {
        remainingPieces = remainingPieces.slice(1);
        remainingColorCouunts = computeRemainingColorCounts(remainingPieces);
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
        remainingColorCouunts,
        roundInProgress
    }
}

function computeScore(board) {
  const allScoreablePatterns = allRowsAndColumns(board);

  const combinedScore = allScoreablePatterns.reduce((score, sequence) => {
    const patternToScore = sequence.map(characterForCell).join("");
    return score + scoreCombo(patternToScore.trim());
  }, 0);

  return combinedScore;
}

const characterForCell = cell => {
    return cell.color ? cell.color.substring(0, 1) : " ";
};

const initializeGame = (boardSize = 5) => {
    const colors = getGameColors(boardSize);
    const board = initializeEntropyBoard(boardSize);
    const legalMoves = allLegalMoves(Roles.CHAOS, board);
    const pieceSequence = generateGamePieceSequence(colors);
    const remainingColorCounts = computeRemainingColorCounts(pieceSequence);

    const game = {
        round: 1,
        score: 0,
        turn: Roles.CHAOS,
        moveNumber: 1,
        roundInProgress: true,
        player1: 'Player 1',
        player2: 'Player 2',
        nextPiece: pieceSequence[0],
        remainingPieces: pieceSequence, 
        remainingColorCounts, 
        legalMoves: legalMoves,
        colors: colors,
        board,
    };

    return game;
};

const makeEntropyCell = (row, column, color = undefined) => ({
  row: row,
  col: column,
  key: `${row}:${column}`,
  color: color
});

export const initializeEntropyBoard = size =>  initializeBoard(size, makeEntropyCell);