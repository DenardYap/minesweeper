import React, { useState, useEffect } from "react";
import Square from "./Square";
import squareStatus from "../utils/squareStatus";

const Board = ({column, row, DEFAULT_BOMB, squareClickHandler, grid, rel}) => {
  
  return (
    <div className="flex flex-col">
      {grid.map((squareRow, index) => {
        return (
          <div key={index} className="flex flex-row">
            {squareRow.map((squareObj) => {
              return <Square key={squareObj.coordinate} coordinate={squareObj.coordinate} imgStatus={squareObj.status} rel = {rel} squareClickHandler={squareClickHandler}/>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;