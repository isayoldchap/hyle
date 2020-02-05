
export const createGame = () => {
    let game = initializeGame();
    let history = [];

    return ({
        newGame: () => {
            return game;
        },
        reset: () => {
            return game;
        },
        getState: () => {
            return game;
        },
        playMove: move => {
            const updatedGame = handleMove(game, move);
            history.push(game);
            
        }
    });
}

const initializeGame = (gameState, boardSize) => {
    const initialBoard = initializeEntropyBoard(boardSize);
    const colors = ALL_COLORS.slice(0, boardSize);
    const pieceSequence = generateGamePieceSequence(colors);

    const newState = {
        ...gameState,
        remainingPieces: pieceSequence,
        colors: colors,
        board: initialBoard
    };

    return newState;
};