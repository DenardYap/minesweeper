import { clear } from "console";
import React, { useEffect, useState } from "react";
import { Coordinate } from "../types/SquareType";
import { squareStatus } from "../utils/statuses";
import {isMobile, isBrowser} from 'react-device-detect';

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

const LONGPRESSED_DELAY = 250;
let buttonPressTimer: ReturnType<typeof setTimeout>;
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

  const hFunc = (e : React.MouseEvent<HTMLElement>) => {
    
    handleSquareOnClick(e, coordinate.row, coordinate.col);
  }

  const hRightFunc = (e : any) => {
    e.preventDefault();
    if (isBrowser) handleRightClick(e, coordinate.row, coordinate.col)
  }

  //TODO: might need to cancel if touchmove?
  //TODO: add adding animation
  //TODO: add shaking effect 
  const handleButtonPress = (e : any) => {
    if (isMobile){

      // after 300ms, trigger hRightFunc and set flags 
      buttonPressTimer = setTimeout(() => handleRightClick(e, coordinate.row, coordinate.col),
                                    LONGPRESSED_DELAY);
    }
  }
  
  // if the button is released within 300ms, we clear timeout, rightFunc never gets called
  const handleButtonRelease = () => {
    if (isMobile) clearTimeout(buttonPressTimer);
  }

  return (
    <div
      className="bg-white"  
      onContextMenu= {hRightFunc}
      onTouchStart={handleButtonPress}
      onTouchEnd={handleButtonRelease}
      onTouchCancel={handleButtonRelease}
      onTouchMove={handleButtonRelease}
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
