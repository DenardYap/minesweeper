import React, { useState } from "react";
import Square from "./Square";

// max is 30 x 30
const DEFAULT_ROW = 15;
const DEFAULT_COL = 20;

const rel = (1/Math.max(DEFAULT_ROW, DEFAULT_COL) * 75).toString() + "vh"; 
// Convert to percentage

const Board = () => {
  const [row, setRow] = useState(DEFAULT_ROW);
  const [column, setColumn] = useState(DEFAULT_COL);
  const [grid, setGrid] = useState(getGrid(row, column));

  return (
    <div className="flex flex-col">
      {grid.map((squareRow, index) => {
        return (
          <div key={index} className="flex flex-row">
            {squareRow.map((squareColumn) => {
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
      currentRow.push(<Square key={`${row}-${col}`} rel = {rel} />);
    }
    grid.push(currentRow);
  }
  return grid;
};
