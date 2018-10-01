export const BoardActionTypes = Object.freeze({
  SQUARE_CLICKED: "squareClicked",
  PASS: "pass",
  UNDO: "undo"
});

export const createSquareClickAction = (row, col) => {
  return {
    type: BoardActionTypes.SQUARE_CLICKED,
    payload: {
      x: col,
      y: row
    }
  };
};

export const createPassAction = () => {
  return {
    type: BoardActionTypes.PASS
  };
};

export const createUndoAction = () => {
  return {
    type: BoardActionTypes.UNDO
  };
};
