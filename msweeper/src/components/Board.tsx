import React, { useState, useEffect } from "react";
import Square from "./Square";
import { squareStatus } from "../utils/statuses";
import { Interface } from "readline";
import { SquareObject } from "../types/SquareType";

interface BoardProps {
  handleSquareOnClick: (event: React.MouseEvent<HTMLElement>, curRow: number, curCol: number) => void;
  handleRightClick: (event: React.MouseEvent<HTMLElement>, curRow: number, curCol: number) => void;
  grid: SquareObject[][];
  rel: string;
}

const Board: React.FC<BoardProps> = ({ handleSquareOnClick, handleRightClick, grid, rel }) => {
  return (
    <div className="flex flex-col">
      {grid.map((squareRow, index) => {
        return (
          <div key={index} className="flex flex-row">
            {squareRow.map((squareObj) => {
              return (
                <Square
                  key={`coord-${squareObj.coordinate.row}-${squareObj.coordinate.col}`}
                  coordinate={squareObj.coordinate}
                  imgStatus={squareObj.status}
                  imgSrc={squareObj.imgSrc}
                  rel={rel}
                  handleSquareOnClick={handleSquareOnClick}
                  handleRightClick={handleRightClick}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
