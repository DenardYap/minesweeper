import { moves } from "../components/Game";
import { Coordinate, SquareObject } from "../types/SquareType";

/**
 *
 * @param max
 * @returns
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

/**
 *
 * @param rowSize
 * @param colSize
 * @returns
 */
export const getGrid = (rowSize: number, colSize: number) => {
  const grid = [];
  for (let row = 0; row < rowSize; row++) {
    const currentRow = [];
    for (let col = 0; col < colSize; col++) {
      const newSquare: SquareObject = {
        status: "SQUARE", //SQUARE, BLANK, BOMB, BOMBX, FLAG, QUESTION
        imgSrc: "SQUARE",
        coordinate: {
          row,
          col,
        },
        bombCount: 0,
      };
      currentRow.push(newSquare);
    }
    grid.push(currentRow);
  }
  return grid;
};

/**
 *
 * @param row
 * @param col
 * @param grid
 * @param rowSize
 * @param colSize
 * @returns
 */
export const bfs = (
  row: number,
  col: number,
  grid: SquareObject[][],
  rowSize: number,
  colSize: number
) => {
  let queue: Coordinate[] = [];
  const start: Coordinate = { row, col };
  queue.push(start);

  grid[row][col].status = "BLANK";
  grid[row][col].imgSrc = "BLANK";

  while (queue.length !== 0) {
    const coordinate = queue.shift();
    if (!coordinate) {
      continue;
    }
    const { row: r, col: c } = coordinate;

    if (grid[r][c].bombCount !== 0) {
      // number from 1 - 8
      // change status and image source

      grid[r][c].status = grid[r][c].bombCount.toString();
      grid[r][c].imgSrc = grid[r][c].bombCount;
    } else {
      // blank
      /**
       * 1 1 X X 1 O
       * O 1 X K 1 1
       * 1 1 F 1 1 1
       * X K K 1 O 1
       * 2 2
       */
      for (let i = 0; i < 8; i++) {
        let newR = r + moves[i][0];
        let newC = c + moves[i][1];

        // Make sure it's inside the board
        // Also make sure its status is still SQUARE,
        // meaning that it's not visited
        if (
          newR >= 0 &&
          newR < rowSize &&
          newC >= 0 &&
          newC < colSize &&
          grid[newR][newC].status === "SQUARE"
        ) {
          grid[newR][newC].status = "BLANK";
          grid[newR][newC].imgSrc = "BLANK";
          const newCoordinate: Coordinate = { row: newR, col: newC };
          queue.push(newCoordinate);
        }
      }
    }
  }
  return grid;
};
