/**Todo
 * 1) smoothen on other browsers
 * 2)
 */
import React, { useEffect, useState } from "react";
import {
  bfs,
  checkGameWin,
  getGrid,
  getRandomInt,
} from "../utils/gameFunction";
import Flag from "./Flag";
import Face from "./Face";
import Timer from "./Timer";
import Board from "./Board";
import LeftBody from "./LeftBody";
import Leaderboard from "./Leaderboard";

import { faceStatus } from "../utils/statuses";
export const moves = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const DEFAULT_VIEW_HEIGHT = 83;
const DEFAULT_COL = 10;
const DEFAULT_ROW = 10;
const DEFAULT_BOMB_COUNT = 10;

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const [column, setColumn] = useState(DEFAULT_COL);
  const [row, setRow] = useState(DEFAULT_ROW);
  const [bombCount, setBomb] = useState(DEFAULT_BOMB_COUNT);
  const [flag, setFlag] = useState(0);

  const [startTimer, setStartTimer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [grid, setGrid] = useState(getGrid(row, column));
  // total available grid e.g. 10 x 10 and 10 bombs = 90 grids
  const [totalGrid, setTotalGrid] = useState(row * column - bombCount);
  const [asd, setAsd] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [mouseDown, setMouseDown] = useState(false);
  const [mouseUp, setMouseUp] = useState(false);
  const [faceSrc, setFaceSrc] = useState(faceStatus.smile);
  const [facePressed, setFacePressed] = useState(false);

  let rel =
    ((1 / Math.max(row, column)) * DEFAULT_VIEW_HEIGHT).toString() + "vh";

  // function for handling faceEvent
  // press -> leave -> up ==> face should remain smile while hover
  // press -> leave -> back to face ==> face should be pressed
  function handleFace(event: React.MouseEvent<HTMLElement>) {
    if (event.type == "mousedown") {
      setFaceSrc(faceStatus.smilePressed);
      setFacePressed(true);
    }

    if (event.type == "mouseup") {
      setFaceSrc(faceStatus.smile);
      setFacePressed(false);
    }

    if (event.type == "mouseleave" && facePressed) {
      setFaceSrc(faceStatus.smile);
    }

    if (event.type == "mouseenter" && mouseDown) {
      setFaceSrc(faceStatus.smilePressed);
    }
    // if (event.type == "mouseleave") {
    //   // setFaceSrc(faceStatus.smile)
    //   console.log("leave");
    //   setFacePressed(false);
    // }
    // if (
    //   event.type == "mousedown" ||
    //   (event.type == "mouseenter" && mouseDown)
    // ) {
    //   console.log("ads");
    //   console.log(facePressed);
    //   setFacePressed(true);
    //   setMouseDown(true);
    //   setFaceSrc(faceStatus.smilePressed);
    // } else {
    //   if (event.type == "mouseup") {
    //     setFacePressed(false);
    //   }
    //   setFaceSrc(faceStatus.smile);
    // }
  }

  const handleMouseUp = () => {
    setMouseUp(true);
    setMouseDown(false);
    setFaceSrc(faceStatus.smile);
  };

  const handleMouseDown = () => {
    setMouseDown(true);
    setMouseUp(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseDown);
    };
  });

  // function to reset the game
  function reset(newRow = row, newColumn = column, newBombCount = bombCount) {
    setIsFirstClick(true);
    setFlag(0);
    setGrid(getGrid(newRow, newColumn));
    setTotalGrid(newRow * newColumn - newBombCount);
    setGameOver(false);
    setGameWon(false);
    setStartTimer(false);
  }

  // function to check and update surrounding
  // images' bombCount
  function updateBombCount(r: number, c: number) {
    for (let i = 0; i < 8; i++) {
      let new_r = r + moves[i][0];
      let new_c = c + moves[i][1];
      if (new_r >= 0 && new_r < row && new_c >= 0 && new_c < column) {
        grid[new_r][new_c].bombCount += 1;
      }
    }
  }

  const handleRightClick = (
    event: React.MouseEvent<HTMLElement>,
    curRow: number,
    curCol: number
  ) => {
    event.preventDefault(); //prevent the default pop up menu
    if (!isFirstClick && !gameOver && !gameWon) {
      if (flag !== bombCount && grid[curRow][curCol].imgSrc == "SQUARE") {
        grid[curRow][curCol].imgSrc = "FLAG";
        setFlag((flag) => flag + 1);
      } else if (grid[curRow][curCol].imgSrc == "FLAG") {
        grid[curRow][curCol].imgSrc = "SQUARE";
        setFlag((flag) => flag - 1);
      }
    }
  };

  // onClick function for image
  const handleSquareOnClick = (
    event: React.MouseEvent<HTMLElement>,
    curRow: number,
    curCol: number
  ) => {
    // TODO: Make sure mouseup is activate even outside of the element

    if (event.button == 0) {
      //left click
      if (!gameOver && !gameWon && event.type == "mouseup") {
        setMouseDown(false);
        setFaceSrc(faceStatus.smile);
        if (isFirstClick) {
          setStartTimer(true);
          setIsFirstClick(false);
          //Generate bomb
          let invalidRow = new Set([curRow, curRow + 1, curRow - 1]);
          let invalidCol = new Set([curCol, curCol + 1, curCol - 1]);

          let randomRow = getRandomInt(row);
          let randomCol = getRandomInt(column);
          let curBombCount = 0;
          while (curBombCount != bombCount) {
            if (
              grid[randomRow][randomCol].status != "BOMB" &&
              // de morgan's law
              !(invalidRow.has(randomRow) && invalidCol.has(randomCol))
            ) {
              curBombCount += 1;
              grid[randomRow][randomCol].status = "BOMB";
              updateBombCount(randomRow, randomCol);
            }

            randomRow = getRandomInt(row);
            randomCol = getRandomInt(column);
          }

          // perform BFS here
          const newGrid = bfs(curRow, curCol, grid, row, column, setTotalGrid);
          setGrid(newGrid);
          // r
        } else if (grid[curRow][curCol].imgSrc != "FLAG") {
          // if it's a bomb
          if (grid[curRow][curCol].status == "BOMB") {
            setGameOver(true);
            setStartTimer(false);
            grid[curRow][curCol].imgSrc = "BOMBRED";
            setFaceSrc(faceStatus.dead);
            // todo: do more stuff here
          } else if (grid[curRow][curCol].status == "SQUARE") {
            if (grid[curRow][curCol].bombCount == 0) {
              grid[curRow][curCol].imgSrc = "BLANK";
              // do BFS if it's an empty square
              const newGrid = bfs(
                curRow,
                curCol,
                grid,
                row,
                column,
                setTotalGrid
              );
              setGrid(newGrid);
            } else {
              setTotalGrid((totalGrid) => totalGrid - 1);
              // got a number, change img src
              grid[curRow][curCol].status =
                grid[curRow][curCol].bombCount.toString();
              grid[curRow][curCol].imgSrc =
                grid[curRow][curCol].bombCount.toString();
            }
          }
        }
      } else if (!gameOver && !gameWon && event.type == "mousedown") {
        setMouseDown(true);
        if (grid[curRow][curCol].imgSrc == "SQUARE")
          grid[curRow][curCol].imgSrc = "BLANK";
        setFaceSrc(faceStatus.xox);
      } else if (event.type == "mouseenter" && mouseDown) {
        asd ? setAsd(false) : setAsd(true);
        if (grid[curRow][curCol].imgSrc == "SQUARE")
          grid[curRow][curCol].imgSrc = "BLANK";
      } else if (event.type == "mouseout" && mouseDown) {
        asd ? setAsd(false) : setAsd(true);
        if (
          grid[curRow][curCol].imgSrc == "BLANK" &&
          (grid[curRow][curCol].status == "SQUARE" ||
            grid[curRow][curCol].status == "BOMB")
        )
          grid[curRow][curCol].imgSrc = "SQUARE";
      }
    }
  };

  // handleChange function for Slider
  const handleSliderChange = (
    sliderNewRow: string,
    sliderNewCol: string,
    sliderNewBomb: string
  ) => {
    // todo: able to reset same value
    setIsFirstClick(true);
    const newRow = parseInt(sliderNewRow);
    const newColumn = parseInt(sliderNewCol);
    const newBombCount = parseInt(sliderNewBomb);
    setRow(newRow);
    setColumn(newColumn);
    setBomb(newBombCount);
    reset(newRow, newColumn, newBombCount);
  };

  //check if game won
  useEffect(() => {
    if (checkGameWin(flag, bombCount, totalGrid)) {
      setGameWon(true);
      setStartTimer(false);
      setFaceSrc(faceStatus.sunglasses);
    }
  }, [flag, totalGrid]);

  // function to adjust the row col and its size
  useEffect(() => {
    //remember to reset
    setGrid(getGrid(row, column));
    rel = ((1 / Math.max(row, column)) * DEFAULT_VIEW_HEIGHT).toString() + "vh";
  }, [column, row, bombCount]);

  return (
    <div className="flex flex-col sm:flex-row justify-between  select-none ">
      {gameWon ? (
        <div
          style={{ fontFamily: "Montserrat-medium", fontSize: "100%" }}
          className="flex flex-col absolute items-center bg-slate-600 m-auto text-center w-[20vw] h-[17.5vh]  text-slate-100 rounded text-[1.2vw] left-0 right-0 top-0 bottom-0"
        >
          <label className="leading-[10vh] bg-slate-600">
            Let's be on the leaderboard 😎
          </label>
          <input
            placeholder={"your name..."}
            className="rounded shadow-2xl w-[90%] h-[5vh] px-[0.5vw] bg-slate-400 text-white hover:bg-slate-200 hover:text-black hover:placeholder-black placeholder-white "
            type="text"
            autoFocus
          />
        </div>
      ) : (
        ""
      )}

      <LeftBody handleSliderChange={handleSliderChange}></LeftBody>
      <div className=" ssm:mx-[1vw] mt-[1vh] bg-[#c2c2c2] p-[1vw] border-solid border-[0.2em] border-l-white border-t-white border-r-[#999] border-b-[#999] h-fit select-none">
        {/* Header */}
        <div
          className="flex bg-[#c0c0c0]  items-center
        border-solid border-[0.2em] border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b] 
        h-fit justify-between"
        >
          {/* Face  */}
          <Flag flagLeft={bombCount - flag}></Flag>

          <Face reset={reset} faceSrc={faceSrc} handleFace={handleFace}></Face>

          <Timer
            startTimer={startTimer}
            gameOver={gameOver}
            gameWon={gameWon}
          ></Timer>
        </div>
        {/* Body */}
        <div
          className="mt-[2vh] border-[0.2em] border-solid border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b] max-h-fit"
          // onMouseLeave={() => {
          //   setMouseDown(false);
          //   setFaceSrc(faceStatus.smile);
          // }}
        >
          <Board
            handleSquareOnClick={handleSquareOnClick}
            handleRightClick={handleRightClick}
            grid={grid}
            rel={rel}
          />
        </div>
      </div>

      <Leaderboard />
    </div>
  );
};

export default Game;
