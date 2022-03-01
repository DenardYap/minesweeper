const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};
let square = document.createElement("img");
square.src = "../sprites/square.png";
const boardElement = document.querySelector("#main-canvas div");
export function createBoard(row, col, numberOfMines) {
  const board = [];
  for (let r = 0; r < row; r++) {
    const row = [];
    for (let c = 0; c < col; c++) {
      const element = document.createElement("div");
      const tile = {
        r,
        c,
      };

      row.push(tile);
    }
    board.push(row);
  }
  return board;
}
