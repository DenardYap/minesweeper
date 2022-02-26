import React, { useEffect, useState } from "react";
import squareStatus from "../utils/squareStatus";

// var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));
// console.log(dir);

const Square = ({rel, imgStatus, squareClickHandler, coordinate}) => {
  const [imgSrc, setImgSrc] = useState(squareStatus.SQUARE);  
  useEffect(() => {
    setImgSrc(squareStatus[imgStatus])
  }, [imgStatus])
  return <div className="bg-white" onClick={(e) => squareClickHandler(e, coordinate)}>
    <img style={{height: rel}} src={imgSrc} />
  </div>;
};

export default Square;
