import { clear } from "console";
import React, { useEffect, useState } from "react";
import { Coordinate } from "../types/SquareType";
import { squareStatus } from "../utils/statuses";
import {isMobile, isDesktop, isTablet} from 'react-device-detect';

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

let timeoutTriggered = false;
const LONGPRESSED_DELAY = 300;
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
    if (!isTablet && !isMobile) handleSquareOnClick(e, coordinate.row, coordinate.col);
  }

  const hRightFunc = (e : any) => {
    e.preventDefault();
    if (!isTablet && !isMobile) handleRightClick(e, coordinate.row, coordinate.col)
  }

  //TODO: add adding animation
  //TODO: add shaking effect 
  const handleButtonPress = (e : any) => {
    if (isMobile || isTablet){

      // after 300ms, trigger hRightFunc and set flags 
      buttonPressTimer = setTimeout(() => {

        timeoutTriggered = true;
        navigator.vibrate(200);
        handleRightClick(e, coordinate.row, coordinate.col)
      },
      LONGPRESSED_DELAY);
    }

  }
  
  // if the button is released within 300ms, we clear timeout, rightFunc never gets called
  const handleButtonRelease = (e : any) => {
    if (isMobile || isTablet) {
      if (!timeoutTriggered && e.type == "touchend"){

        handleSquareOnClick(e, coordinate.row, coordinate.col);
      }

      clearTimeout(buttonPressTimer)
      if (e.type == "touchmove" || e.type == "touchcancel") timeoutTriggered = true;
      else timeoutTriggered = false;
      /** Case 1: Touch and released within 300ms 
       *  OK
       *  Case 1.2: Touch and move
       *  OK
       *  Case 2: Touch and hold for 300 ms and release
       *  OK
       *  Case 3: Touch and hold for 300 ms and release after 300 ms
       */
    };
  }

  return (
    <div
      className="bg-white"  
      onContextMenu= {hRightFunc}
      onTouchStart={handleButtonPress}
      onTouchEnd={handleButtonRelease}
      onTouchCancel={(e) => {
        if (!timeoutTriggered) {
          handleButtonRelease(e)
        }
       }}
      onTouchMove={(e) => {
        if (!timeoutTriggered) {
          handleButtonRelease(e)
        }
       }}
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
