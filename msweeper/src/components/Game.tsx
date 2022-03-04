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
import Leaderboard from "./leaderboard/Leaderboard";
import WinPopUp from "./WinPopUp";
import SignUpAndTextMobile from "./SignUpAndTextMobile";
import { faceStatus } from "../utils/statuses";
import { readLeaderboard, updateLeaderboard } from "../utils/databaseFunctions";
import {isMobile, isBrowser} from 'react-device-detect';

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

let winTime = 0;
let winName = "";
let winMode = "easy";
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
  const [showPopUp, setShowPopUp] = useState(false);

  const [mouseDown, setMouseDown] = useState(false);
  const [mouseUp, setMouseUp] = useState(false);
  const [faceSrc, setFaceSrc] = useState(faceStatus.smile);
  const [facePressed, setFacePressed] = useState(false);

  let rel =
    ((1 / Math.max(row, column)) * DEFAULT_VIEW_HEIGHT).toString() + "vh";

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
  }

  const handleMouseUp = () => {
    setMouseUp(true);
    setMouseDown(false);
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
      document.removeEventListener("mousedown", handleMouseDown);
    };
  });

  useEffect(() => {
    if (gameOver) {
      setFaceSrc(faceStatus.dead);
    }
    if (gameWon) {
      setFaceSrc(faceStatus.sunglasses);
    }
  }, [gameWon, gameOver]);

  // function to reset the game
  function reset(newRow = row, newColumn = column, newBombCount = bombCount) {
    setIsFirstClick(true);
    setFlag(0);
    setGrid(getGrid(newRow, newColumn));
    setTotalGrid(newRow * newColumn - newBombCount);
    setGameOver(false);
    setGameWon(false);
    setStartTimer(false);
    setShowPopUp(false);
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
    event: any,
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
      } else if (!gameOver && !gameWon && event.type == "mousedown" ) {
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
    setIsFirstClick(true);
    const newRow = parseInt(sliderNewRow);
    const newColumn = parseInt(sliderNewCol);
    const newBombCount = parseInt(sliderNewBomb);
    setRow(newRow);
    setColumn(newColumn);
    setBomb(newBombCount);
    reset(newRow, newColumn, newBombCount);
  };

  function getMode() {
    const area = row * column;
    const bombRatio = bombCount / area;

    // calculate the mode
    // more testing
    if (area < 256) winMode = "easy";
    else if (area < 484) {
      if (bombRatio <= 0.15625) winMode = "easy";
      else winMode = "medium";
    } else {
      if (bombRatio <= 0.1) winMode = "easy";
      else if (bombRatio <= 0.15625) winMode = "medium";
      else winMode = "hard";
    }
  }
  //check if game won

  async function gameWonAftermath(curName: string, resetOrNot = false) {
    // name and timer is now gathered, update the data
    getMode(); //initialize mode to winMode

    // then do the leaderboard calculation here
    // todo: cache the data
    const cur_leaderboard: any = await readLeaderboard(winMode);

    // updateLeaderboard(winMode, )
    let pos = 5;
    let last_diff = 1000;
    Object.keys(cur_leaderboard).forEach((key) => {
      console.log(cur_leaderboard[key].timeUsed);
      if (
        winTime < cur_leaderboard[key].timeUsed &&
        last_diff > cur_leaderboard[key].timeUsed - winTime
      ) {
        last_diff = cur_leaderboard[key].timeUsed - winTime;
        pos = parseInt(key);
      }
    });

    let data: any = {};
    // todo: push every lower index one index lower

    data[pos] = { name: curName, timeUsed: winTime };
    if (pos !== 4) updateLeaderboard(winMode, data);

    if (resetOrNot) reset();
  }

  useEffect(() => {
    if (checkGameWin(flag, bombCount, totalGrid)) {
      setGameWon(true);
      setStartTimer(false);
      setFaceSrc(faceStatus.sunglasses);
      // if the default name is not keyed in,
      // we pop up
      (async function () {
        winName = gatherDefaultData();
        if (!winName) setShowPopUp(true);
        else {
          gameWonAftermath(winName);
        }
      })();
    }
  }, [flag, totalGrid]);

  // function to adjust the row col and its size
  useEffect(() => {
    //remember to reset
    setGrid(getGrid(row, column));
    rel = ((1 / Math.max(row, column)) * DEFAULT_VIEW_HEIGHT).toString() + "vh";
  }, [column, row, bombCount]);

  function setWinTime(time: number) {
    winTime = time;
  }

  function gatherDefaultData() {
    let name: any;
    //if small screen, we get signup mobile instead of signup
    if (window.innerWidth < 640)
      name = document.getElementById("signup-mobile");
    else name = document.getElementById("signup");

    //if the default name is empty, we return false
    if (name.value.length === 0) return false;
    else return name.value;

    //gather all the data after won game
  }
  return (
    <div className="game flex ssm:flex-col sm:flex-row 
    justify-between select-none pb-[5vh] ">
      {/* Win pop up for name */}
      <WinPopUp showPopUp={showPopUp} gameWonAftermath={gameWonAftermath} />

      {/* Left side of the body */}

      <LeftBody handleSliderChange={handleSliderChange}></LeftBody>
      <SignUpAndTextMobile></SignUpAndTextMobile>
      {/* Main container for the middle body */}
      <div className="ssm:flex ssm:flex-row ssm:justify-center sm:block sm:order-2 ssm:order-1">
        
        <div className=" ssm:mx-[1vw] mt-[1vh] bg-[#b3a8a8] p-[1vw] 
        border-solid border-[0.2em] border-l-white border-t-white border-r-[#999] border-b-[#999] 
        ssm:w-fit h-fit select-none "
        >
          {/* Header */}
          <div
            className="flex bg-[#c0c0c0]  items-center
          border-solid border-[0.2em] border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b] 
          h-fit  justify-between"
          >
            {/* Face  */}
            <Flag flagLeft={bombCount - flag}></Flag>

            <Face
              reset={reset}
              faceSrc={faceSrc}
              handleFace={handleFace}
            ></Face>

            <Timer
              startTimer={startTimer}
              gameOver={gameOver}
              gameWon={gameWon}
              setWinTime={setWinTime}
            ></Timer>
          </div>
          {/* Body */}
          <div
            className="mt-[2vh] border-[0.2em] 
          border-solid border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b] 
          max-h-fit"
          >
            <Board
              handleSquareOnClick={handleSquareOnClick}
              handleRightClick={handleRightClick}
              grid={grid}
              rel={rel}
            />
          </div>
        </div>
      </div>
      <Leaderboard />
    </div>
  );
};

export default Game;
