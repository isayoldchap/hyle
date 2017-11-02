
const boardReducer = (state = makeBoard(5), action) => {
  console.log("Handling action: ", action);
  switch(action.type) {
    case 'X':
      return state;
    default :
    return state;
  }
};

const makeCell = (row, column, color) => {
  return {
    row: row,
    col: column,
    color: color,
    key: row + ":" + column
  }
};

const myColors = ['red', 'magenta', 'green', 'blue', 'orange',
  'cyan', 'purple', "yellow", "brown", "black"];

const makeBoard = (size = 5) => {
  let rows = [];
  for (let row = 0; row < size; row++) {
    let currentRow = [];
    for (let col = 0; col < size; col++) {
      currentRow[col] = makeCell(row +1, col+1, myColors[row]);
    }
    rows[row] = currentRow;
  }
  return {board: rows};
};

export const allRowsAndColumns = (board) => {
  const rows = getRows(board);
  const columns = getColumns(board);
  const all = rows.concat(columns);

  return all;
};

const getColumns = (board) => {
  const columns = [];
  for (let col = 1; col <= board.length; col++ ){
    columns.push(getColumn(board, col))
  }
  return columns;
};

const getRows = (board) => {
  return board;
};

const getRow = (board, row) => {
  return board[transformIndex(row)];
};

const getColumn = (board, col) => {
  return board.map(row =>
    row[transformIndex(col)]
  );
};

const getCell = (board, row, col) => {
  return board.rows[transformIndex(row)][transformIndex(col)];
};

const transformIndex = (boardIndex) => {
  return boardIndex-1;
}

export default boardReducer;
