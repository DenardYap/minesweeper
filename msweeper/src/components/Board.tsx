import React, { useState, useEffect } from "react";
import Square from "./Square";
import { squareStatus } from "../utils/squareStatus";
import { Interface } from "readline";
import { SquareObject } from "../types/SquareType";

interface BoardProps {
  handleSquareOnClick: (event: any, curRow: number, curCol: number) => void;
  grid: SquareObject[][];
  rel: string;
}

const Board: React.FC<BoardProps> = ({ handleSquareOnClick, grid, rel }) => {
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
