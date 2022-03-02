import React, { useEffect, useState } from "react";
import { Coordinate } from "../types/SquareType";
import { squareStatus } from "../utils/statuses";

// var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));
// console.log(dir);

interface SquareProps {
  rel: string;
  imgStatus: string;
  imgSrc: string | number;
  handleSquareOnClick: (event: React.MouseEvent<HTMLElement>, curRow: number, curCol: number) => void;
  handleRightClick: (event: React.MouseEvent<HTMLElement>, curRow: number, curCol: number) => void; 
  coordinate: Coordinate;
}

const Square: React.FC<SquareProps> = ({
  rel,
  imgStatus,
  imgSrc,
  handleSquareOnClick,
  handleRightClick,
  coordinate,
}) => {
  const [src, setSrc] = useState(squareStatus.SQUARE);
  const [status, setStatus] = useState("SQUARE");

  useEffect(() => {
    setStatus(imgStatus);
  }, [imgStatus]);

  useEffect(() => {
    setSrc(squareStatus[imgSrc]);
  }, [imgSrc]);

  let hFunc = (e : React.MouseEvent<HTMLElement>) => {
    handleSquareOnClick(e, coordinate.row, coordinate.col);
  }
  return (
    <div
      className="bg-white"  
      onContextMenu= {(e) => handleRightClick(e, coordinate.row, coordinate.col)}
      onMouseEnter={hFunc}
      onMouseOut={hFunc}
      onMouseDown={hFunc}
      onMouseUp={hFunc}
    >
      <img onDragStart={ (e) => e.preventDefault()} style={{ height: rel }} src={src} />
    </div>
  );
};

export default Square;
