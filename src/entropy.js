import { initializeBoard } from "./board";

const makeEntropyCell = (row, column, color = undefined) => {
    return {
      row: row,
      col: column,
      key: row + ":" + column,
      color: color
    };
  };

export const initializeEntropyBoard = size =>  initializeBoard(size, makeEntropyCell);

