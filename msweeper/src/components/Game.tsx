/**Todo
 * 1) smoothen on other browsers
 * 2)
 */
import React, { useEffect, useState } from "react";
import { bfs, getGrid, getRandomInt } from "../utils/gameFunction";
import Board from "./Board";
import Slider from "./Slider";

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

const DEFAULT_VIEW_HEIGHT = 80;
const DEFAULT_COL = 10;
const DEFAULT_ROW = 10;
const DEFAULT_BOMB_COUNT = 10;

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const [column, setColumn] = useState(DEFAULT_COL);
  const [row, setRow] = useState(DEFAULT_ROW);
  const [bomb, setBomb] = useState(DEFAULT_BOMB_COUNT);

  const [gameOver, setGameOver] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [grid, setGrid] = useState(getGrid(row, column));
  const [totalGrid, setTotalGrid] = useState(row * column - bomb);
  const [asd, setAsd] = useState(false);

  let rel =
    ((1 / Math.max(row, column)) * DEFAULT_VIEW_HEIGHT).toString() + "vh";

  useEffect(() => {
    //remember to reset
    setGrid(getGrid(row, column));
    rel = ((1 / Math.max(row, column)) * DEFAULT_VIEW_HEIGHT).toString() + "vh";
  }, [column, row, bomb]); //todo: also put DEFAULT_BOMB

  function reset() {
    setIsFirstClick(true);
    setGrid(getGrid(row, column));
    setGameOver(false);
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

  const handleRightClick = (event: React.MouseEvent<HTMLElement>, curRow: number, curCol: number ) =>{
    event.preventDefault(); //prevent the default pop up menu
    if (!gameOver){
      asd ? setAsd(false) : setAsd(true); // in order to trigger useState, find a better way 
      if (grid[curRow][curCol].imgSrc == "SQUARE") grid[curRow][curCol].imgSrc = "FLAG";
      else if (grid[curRow][curCol].imgSrc == "FLAG") grid[curRow][curCol].imgSrc = "SQUARE";
    }
  }
  // onClick function for image
  const handleSquareOnClick = (event: React.MouseEvent<HTMLElement>, curRow: number, curCol: number) => {
    if (!gameOver){
      
      if (isFirstClick) {
        setIsFirstClick(false);
        //Generate bomb
        let invalidRow = new Set([curRow, curRow + 1, curRow - 1])
        let invalidCol = new Set([curCol, curCol + 1, curCol - 1])

        let randomRow = getRandomInt(row);
        let randomCol = getRandomInt(column);
        let curBombCount = 0;
        // TODO: first click is ALWAYS BLANK
        while (curBombCount != bomb) {
          if (
            grid[randomRow][randomCol].status != "BOMB" &&
            // (randomRow != curRow || randomCol != curCol)
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
        const newGrid = bfs(curRow, curCol, grid, row, column);
        setGrid(newGrid);
      } else if (grid[curRow][curCol].imgSrc != "FLAG"){
        // if it's a bomb
        if (grid[curRow][curCol].status == "BOMB") {
          // asd ?  setAsd(false) : setAsd(true)
          setGameOver(true);
          grid[curRow][curCol].imgSrc = "BOMB";
          // todo: do more stuff here
        } else if (grid[curRow][curCol].status == "SQUARE") {
          console.log("asdasd")
          if (grid[curRow][curCol].bombCount == 0) {
            asd ? setAsd(false) : setAsd(true);
            grid[curRow][curCol].imgSrc = "BLANK";
            
            // do BFS if it's an empty square
            const newGrid = bfs(curRow, curCol, grid, row, column);
            setGrid(newGrid);
          } else {
            // got a number, change img src
            // setTotalGrid(totalGrid - 1)
            asd ? setAsd(false) : setAsd(true);
            grid[curRow][curCol].imgSrc =
              grid[curRow][curCol].bombCount.toString();
          }
        }
        // setGrid(grid);
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
    setColumn(parseInt(sliderNewCol));
    setRow(parseInt(sliderNewRow));
    setBomb(parseInt(sliderNewBomb));
  };

  return (
    <div className="flex justify-between pt-[2vh]">
      {gameOver ? <div className="flex flex-col absolute items-center bg-slate-600 m-auto text-center w-[20vw] h-[17.5vh]  text-slate-100 rounded text-[1.2vw] left-0 right-0 top-0 bottom-0"> 
        <label className="leading-[10vh]">Let's be on the leaderboard 😎</label>
        <input className="shadow-2xl w-[90%] h-[5vh] text-black px-[0.5vw]" type="text" /> 
      </div> : 
      ""} 
      {/* Sign up and Name */}
      <div className="flex flex-col  w-[30%] ">
        <div className="flex flex-row text-[100%]">
          <button className="w-[25%] h-[5vh] mx-[1vw] text-[3vh] text-center inline-block bg-slate-500 hover:font-bold text-inherit  text-white rounded  shadow-md hover:shadow-lg">
            Sign up
          </button>
          <input
            placeholder={"your name..."}
            type="text"
            className="w-[80%] h-[5vh] px-[1%] mx-3 shadow-md hover:shadow-lg border-2 border-grey-700 rounded"
          />
        </div>
        {/* Content */}
        <p className="m-3" style={{ fontFamily: "Pangolin", fontSize: "150%" }}>
          <strong> Hello and welcome to msweeper.com!</strong> <br />
          <br />
          Type in your name to be on the Leaderboard! <br />
          <br />
          Sign up for an account to view stats, compete with others, get in game
          coins and buy different themes! <br />
          <br />
        </p>
        <div className="flex flex-row justify-between m-3">
          <button
            className="rounded bg-slate-600 text-slate-100 p-[2vw] m-[1vw] hover:bg-slate-400 hover:border-2 border-black"
            style={{ fontFamily: "Pangolin", fontSize: "150%" }}
          >
            How to Play
          </button>
          <button
            className="rounded bg-slate-600 text-slate-100 p-[2vw] m-[1vw] hover:bg-slate-400 hover:border-2 border-black"
            style={{ fontFamily: "Pangolin", fontSize: "150%" }}
          >
            How does this website work
          </button>
        </div>
      </div>
      <div className="  bg-[#c2c2c2] p-[1vw] border-solid border-[0.4vw] border-l-white border-t-white border-r-[#999] border-b-[#999] max-h-fit">
        {/* Header */}
        <div
          className="flex bg-[#c0c0c0] px-[0.5vw] 
        border-solid border-[0.4vw]
        border-r-white border-b-white 
        border-l-[#7b7b7b] border-t-[#7b7b7b] h-[10vh] justify-between"
        >
          {/* Face  */}
          <div className="m-[0.5vw] flex w-fit">
            <img src="/images/0.png" />
            <img src="/images/0.png" />
            <img src="/images/0.png" />
          </div>
          <input type="image" src="/images/smile.png" className="m-[0.5vw]" />

          <div className="m-[0.5vw] flex w-fit">
            <img src="/images/0.png" />
            <img src="/images/0.png" />
            <img src="/images/0.png" />
          </div>
        </div>
        {/* Body */}
        <div className="mt-[2vh] border-[0.4vw] border-solid border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b] max-h-fit">
          <Board
            handleSquareOnClick={handleSquareOnClick}
            handleRightClick={handleRightClick}
            grid={grid}
            rel={rel}
          />
        </div>
      </div>

      {/* Sliders */}
      <Slider handleSliderChange={handleSliderChange} />
    </div>
  );
};

export default Game;