import { HistoryActionTypes } from "../actioncreators/historyActions";
import { createEngine } from "../engine/engine";
import { selectTurn } from "../selectors/gameSelector";

const engine = createEngine();

export const newGame = options =>  dispatch => {
    engine.newGame(options);
    dispatch({type: 'UPDATE_GAME_STATE', payload: engine.getState()});
};

export const advanceRound = () => dispatch => {
    engine.advanceRound();
    dispatch({type: 'UPDATE_GAME_STATE', payload: engine.getState()});
}

export const handlePass = () => dispatch => {
    engine.playMove({pass: true});
    const updatedState = engine.getState();
    dispatch({type: 'UPDATE_GAME_STATE', payload: updatedState});
}

function isValid(moves, move) {
    return moves.some(each => each.x === move.x && each.y === move.y);
}

export const handleClick = (x, y) => (dispatch, getState) => {
    const clickLocation = {x, y};
    const state = getState();
    const turn = selectTurn(state);
    const halfMove = state.orderHalfMove;
    const legalMoves = state.legalMoves;

    if (turn === 'Order') {
        if (!halfMove) {
            const legalStartMoves = legalMoves.map(move => move.start);
            if (isValid(legalStartMoves, clickLocation)) {
                dispatch({type: 'ORDER_HALF_MOVE', payload: clickLocation});
            }
        } else {
            const legalEndMoves = legalMoves.map(move => move.end);
            if (isValid(legalEndMoves, clickLocation)) {
                playMove(engine, {start: state.orderHalfMove, end: clickLocation});
            } else {
                dispatch({type: 'RESET_ORDER_HALF_MOVE', payload: clickLocation});
            }
        }

    } else if (turn === 'Chaos') {
        if (isValid(legalMoves, clickLocation)) {
            playMove(engine, clickLocation);
        }
    };

    function playMove(engine, move) {
        engine.playMove(move);
        const updatedState = engine.getState();
        dispatch({type: 'UPDATE_GAME_STATE', payload: updatedState});
    }
    
};

const gameReducer = (state = engine.getState(), action) => {
    const actionType = action.type;

    if (actionType === 'UPDATE_GAME_STATE') {
        return {
            ...state,
            ...action.payload,
            orderHalfMove: undefined
        };
    } else if (actionType === 'ORDER_HALF_MOVE') {
        return {
            ...state,
            orderHalfMove: action.payload   
        };
    } else if (actionType === 'RESET_ORDER_HALF_MOVE') {
        return {
            ...state,
            orderHalfMove: undefined  
        };
    }
     
    return state;
};

const withHistory = reducer => (state, action) => {
    const oldState = state || {};

    if (action.type === HistoryActionTypes.BACK) {
        const stateHistory = oldState.history || [];
        if (stateHistory.length === 1) {
        return oldState;
        }

        const previousState = stateHistory[stateHistory.length - 1];
        return previousState;
    }

    const newState = reducer(state, action);

    if (state === newState) return state;

    const previousHistory = oldState.history || [];
    const stateWithHistory = Object.assign({}, newState, {
        history: previousHistory.concat(oldState)
    });

    return stateWithHistory;
};

//  export const entropyReducer = withHistory(gameReducer);
 export const entropyReducer = gameReducer;

  