import React, { useState } from "react";
import Square from "./Square";

const DEFAULT_ROW = 10;
const DEFAULT_COL = 10;

const Board = () => {
  const [row, setRow] = useState(DEFAULT_ROW);
  const [column, setColumn] = useState(DEFAULT_COL);
  const [grid, setGrid] = useState(getGrid(row, column));

  return (
    <div className="flex flex-col">
      {grid.map((squareRow, index) => {
        return (
          <div key={index} className="flex flex-row">
            {squareRow.map((squareColumn, colIndex) => {
              return squareColumn;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

const getGrid = (rowSize, colSize) => {
  const grid = [];
  for (let row = 0; row < rowSize; row++) {
    const currentRow = [];
    for (let col = 0; col < colSize; col++) {
      currentRow.push(<Square key={`${row}-${col}`} />);
    }
    grid.push(currentRow);
  }
  return grid;
};
