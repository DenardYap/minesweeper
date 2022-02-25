import React, { useState, useEffect } from "react";
import Square from "./Square";

const DEFAULT_VIEW_HEIGHT = 80;
const Board = ({column, row, DEFAULT_BOMB}) => {
  const [grid, setGrid] = useState(getGrid(row, column));

  useEffect(() => {
    //remember to reset
    setGrid(getGrid(column, row))
  }, [column, row]) //todo: also put DEFAULT_BOMB
  
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
  
  let rel = (1/Math.max(rowSize, colSize) * DEFAULT_VIEW_HEIGHT).toString() + "vh";
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