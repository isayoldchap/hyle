export const BoardActionTypes = Object.freeze({
  SQUARE_CLICKED: "squareClicked",
  PASS: "pass",
  UNDO: "undo"
});

export const createSquareClickAction = (row, col) => ({
  type: BoardActionTypes.SQUARE_CLICKED,
  payload: {
    x: col,
    y: row
  }
});

const createSimpleTypeAction = type => () => ({type});

export const createPassAction = createSimpleTypeAction(BoardActionTypes.PASS);
export const createUndoAction = createSimpleTypeAction(BoardActionTypes.UNDO);