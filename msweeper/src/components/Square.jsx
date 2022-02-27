import React, { useEffect, useState } from "react";
import squareStatus from "../utils/squareStatus";

// var loc = window.location.pathname;
// var dir = loc.substring(0, loc.lastIndexOf('/'));
// console.log(dir);

const Square = ({rel, imgStatus, imgSrc, squareClickHandler, coordinate}) => {
  
  const [src, setSrc] = useState(squareStatus.SQUARE)
  const [status, setStatus] = useState("SQUARE")

  useEffect(() => {
    setStatus(imgStatus)
    console.log("zxczxc")
  }, [imgStatus]); 
  
  useEffect(() => {
    setSrc(squareStatus[imgSrc])
    console.log("asd")
  }, [imgSrc])
  
  return <div className="bg-white" onClick={(e) => squareClickHandler(e, coordinate[0], coordinate[1])}>
    <img style={{height: rel}} src={src} />
  </div>;
};

export default Square;
