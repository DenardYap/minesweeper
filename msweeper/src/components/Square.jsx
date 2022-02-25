import React, { useState } from "react";
import squareStatus from "../utils/squareStatus";

const moves = {
  0: [0, 1],
  1: [0, -1],
  2: [1, 0],
  3: [-1, 0],
  4: [1, 1],
  5: [1, -1],
  6: [-1, 1],
  7: [-1, -1],
};
var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));
console.log(dir);
const Square = ({rel}) => {
  const [imgSrc, setImgSrc] = useState(squareStatus.SQUARE);
  return <div className="bg-white" onClick={() => {
    setImgSrc(squareStatus.BOMB)
  }}>
    <img style={{height: rel}} src={imgSrc} />
  </div>;
};

export default Square;
