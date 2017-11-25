export const BoardActionTypes = {
  SQUARE_CLICKED: "squareClicked",
  PASS: "pass"
};

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
