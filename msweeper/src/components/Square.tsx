import React, { useEffect, useState } from "react";
import { Coordinate } from "../types/SquareType";
import { squareStatus } from "../utils/squareStatus";

// var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));
// console.log(dir);

interface SquareProps {
  rel: string;
  imgStatus: string;
  imgSrc: string | number;
  handleSquareOnClick: (event: any, curRow: number, curCol: number) => void;
  coordinate: Coordinate;
}

const Square: React.FC<SquareProps> = ({
  rel,
  imgStatus,
  imgSrc,
  handleSquareOnClick,
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

  return (
    <div
      className="bg-white"
      onClick={(e) => handleSquareOnClick(e, coordinate.row, coordinate.col)}
    >
      <img style={{ height: rel }} src={src} />
    </div>
  );
};

export default Square;
