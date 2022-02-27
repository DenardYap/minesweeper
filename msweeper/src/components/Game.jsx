/**Todo
 * 1) smoothen on other browsers
 * 2)
 */
import React, { useEffect, useState } from "react";
import Board from "./Board";
import Slider from "./Slider";

const moves = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const DEFAULT = {
  col: 10,
  row: 10,
  bomb: 10,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function bfs(row, col, grid, rowSize, colSize) {
  let queue = [];
  queue.push([row, col]);

  grid[row][col].status = "BLANK";
  grid[row][col].imgSrc = "BLANK";

  while (queue.length != 0) {
    const coordinate = queue.shift();
    const r = coordinate[0];
    const c = coordinate[1];

    if (grid[r][c].bombCount != 0) {
      // number from 1 - 8

      // change status and image source
      let bombCountString = grid[r][c].bombCount.toString();
      grid[r][c].status = bombCountString;
      grid[r][c].imgSrc = bombCountString;
    } else {
      // blank
      /**
       * 1 1 X X 1 O
       * O 1 X K 1 1
       * 1 1 F 1 1 1
       * X K K 1 O 1
       * 2 2
       */
      for (let i = 0; i < 8; i++) {
        let new_r = r + moves[i][0];
        let new_c = c + moves[i][1];

        // Make sure it's inside the board
        // Also make sure its status is still SQUARE,
        // meaning that it's not visited
        if (
          new_r >= 0 &&
          new_r < rowSize &&
          new_c >= 0 &&
          new_c < colSize &&
          grid[new_r][new_c].status == "SQUARE"
        ) {
          grid[new_r][new_c].status = "BLANK";
          grid[new_r][new_c].imgSrc = "BLANK";
          queue.push([new_r, new_c]);
        }
      }
    }

    // if (grid[r][c].status != "BOMB") {
    //   // maybe can do &&
    //   if (grid[r][c].bombCount == 0) {
    //     for (let i = 0; i < 8; i++) {
    //       let new_r = r + moves[i][0];
    //       let new_c = c + moves[i][1];
    //       if (
    //         0 <= new_r &&
    //         0 <= new_c &&
    //         new_r < rowSize &&
    //         new_c < colSize &&
    //         grid[new_r][new_c].status != "BOMB" &&
    //         grid[new_r][new_c].imgSrc == "SQUARE"
    //       ) {
    //         queue.push([new_r, new_c]);
    //       }
    //     }
    //     grid[r][c].imgSrc = "BLANK";
    //   } else {
    //     for (let i = 0; i < 8; i++) {
    //       let new_r = r + moves[i][0];
    //       let new_c = c + moves[i][1];
    //       // if (
    //       //   0 <= new_r &&
    //       //   0 <= new_c &&
    //       //   new_r < rowSize &&
    //       //   new_c < colSize &&
    //       //   grid[new_r][new_c].status != "BOMB" &&
    //       //   grid[new_r][new_c].imgSrc == "SQUARE"
    //       // ) {
    //       //   queue.push([new_r, new_c]);
    //       // }
    //       queue.push([new_r, new_c]);
    //     }
    //     grid[r][c].imgSrc = grid[r][c].bombCount.toString();
    //     console.log(grid[r][c].imgSrc);
    //   }
    // }
  }
  return grid;
}

const getGrid = (rowSize, colSize) => {
  const grid = [];
  for (let row = 0; row < rowSize; row++) {
    const currentRow = [];
    for (let col = 0; col < colSize; col++) {
      currentRow.push({
        status: "SQUARE", //SQUARE, BLANK, BOMB, BOMBX, FLAG, QUESTION
        imgSrc: "SQUARE",
        coordinate: [row, col],
        bombCount: 0,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

const DEFAULT_VIEW_HEIGHT = 80;
const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [column, setColumn] = useState(DEFAULT.col);
  const [row, setRow] = useState(DEFAULT.row);
  const [bomb, setBomb] = useState(DEFAULT.bomb);
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
  function updateBombCount(r, c) {
    for (let i = 0; i < 8; i++) {
      let new_r = r + moves[i][0];
      let new_c = c + moves[i][1];
      if (new_r >= 0 && new_r < row && new_c >= 0 && new_c < column) {
        grid[new_r][new_c].bombCount += 1;
      }
    }
  }

  // onClick function for image
  const squareClickHandler = (event, curRow, curCol) => {
    if (isFirstClick) {
      setIsFirstClick(false);
      //Generate bomb

      let rand_row = getRandomInt(row);
      let rand_col = getRandomInt(column);
      let curBombCount = 0;
      // TODO: first click is ALWAYS BLANK
      while (curBombCount != bomb) {
        if (
          grid[rand_row][rand_col].status != "BOMB" &&
          (rand_row != curRow || rand_col != curCol)
        ) {
          curBombCount += 1;
          grid[rand_row][rand_col].status = "BOMB";
          updateBombCount(rand_row, rand_col);
        }

        rand_row = getRandomInt(row);
        rand_col = getRandomInt(column);
      }

      // perform BFS here
      const newGrid = bfs(curRow, curCol, grid, row, column);
      setGrid(newGrid);
    } else {
      // if it's a bomb
      if (grid[curRow][curCol].status == "BOMB") {
        // asd ?  setAsd(false) : setAsd(true)
        setGameOver(true);
        grid[curRow][curCol].imgSrc = "BOMB";
        // todo: do more stuff here
      } else if (grid[curRow][curCol].status == "SQUARE") {
        if (grid[curRow][curCol].bombCount == 0) {
          asd ? setAsd(false) : setAsd(true);
          grid[curRow][curCol].imgSrc = "BLANK";
          // do BFS
        } else {
          // got a number, change img src
          // setTotalGrid(totalGrid - 1)
          asd ? setAsd(false) : setAsd(true);
          grid[curRow][curCol].imgSrc = grid[curRow][curCol].bombCount;
        }
      }
      // setGrid(grid);
    }
  };

  // handleChange function for Slider
  const handleChange = (new_row, new_col, new_bomb) => {
    // todo: able to reset same value
    setIsFirstClick(true);
    setColumn(parseInt(new_col));
    setRow(parseInt(new_row));
    setBomb(parseInt(new_bomb));
  };

  return (
    
    <div className="flex justify-between pt-[2vh]">
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
      
        {/* Body */}
      <div className="bg-[#c2c2c2] p-[1vw] border-solid border-[0.3vw] border-l-white border-t-white border-r-[#999] border-b-[#999] h-fit">
        
          
        {/* Header */}  
        <div 
        className="flex flex-row bg-[#c0c0c0] px-[0.5vw] 
        border-solid border-[0.3vw]
        border-r-white border-b-white 
        border-l-[#7b7b7b] border-t-[#7b7b7b] h-[10vh] justify-between "> 
        
        {/* Number 1 */}
        <div className="m-[0.5vw] flex">

          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
        </div>

        {/* Face  */}
        <input type="image" src="/images/smile.png" className="m-[0.5vw]"/>
        
        {/* Number 2 */}
        <div className="m-[0.5vw] flex">

          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
        </div>
        </div>
        <div className="mt-[2vh] border-[0.3vw] border-solid border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b]"> 
        <Board column={column} row={row} bomb={bomb} squareClickHandler={squareClickHandler} grid={grid} rel={rel}/>
        </div>
      </div>

      {/* Sliders */}
      <Slider handleChange={handleChange} />
    </div>
  );
};

export default Game;
