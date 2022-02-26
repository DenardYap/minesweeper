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
]

const DEFAULT = {
  col: 10,
  row: 10,
  bomb: 10
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const RandomizeCoordinates = () => {
  // if the coordinate is generated, repeat the random 
  // until no more repeated value 
  // use a set to keep track of the current generate coor. 

  // pseudocode
  // while:
  //   generate
  //   if generated coor in set:
  //     generate again 
  //   board[generated_grid].status = bomb 
}

const getGrid = (rowSize, colSize) => {
  
  const grid = [];
  for (let row = 0; row < rowSize; row++) {
    const currentRow = [];
    for (let col = 0; col < colSize; col++) {
      
      currentRow.push({
        status: "SQUARE", //SQUARE, BLANK, BOMB, BOMBX, FLAG, QUESTION
        coordinate: [row, col],
        bombCount: 0
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
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [grid, setGrid] = useState(getGrid(row, column));

  let rel = (1/Math.max(row, column) * DEFAULT_VIEW_HEIGHT).toString() + "vh";
  useEffect(() => {
    //remember to reset
    setGrid(getGrid(row, column))
    rel = (1/Math.max(row, column) * DEFAULT_VIEW_HEIGHT).toString() + "vh";
  }, [column, row]) //todo: also put DEFAULT_BOMB
  
    // function to check and update surrounding
    // images' bombCount
    function updateBombCount(r, c) {
      for (let i = 0; i < 8; i++) {
        let new_r = r + moves[i][0]
        let new_c = c + moves[i][1]
        if (new_r >= 0 && new_r < row && new_c >= 0 && new_c < column) {
          console.log(new_r, new_c)
          grid[new_r][new_c].bombCount += 1;
        }
      }
    }

  // onClick function for image  
  const squareClickHandler = (event, coordinate) => {
    console.log(grid[coordinate[0]][coordinate[1]])
    if (isFirstClick) {
      setIsFirstClick(false);
      //Generate bomb
      
      let rand_row = getRandomInt(row);
      let rand_col = getRandomInt(column); 
      let curBombCount = 0;
      while (curBombCount != bomb) {
        console.log(grid[rand_row][rand_col])
        console.log(row, column, bomb, curBombCount)
        // TODO: make sure don't generate bomb on the first click 
        if (grid[rand_row][rand_col].status != "BOMB") {
          console.log("Hi2")
          curBombCount += 1
          console.log("Hi3")
          grid[rand_row][rand_col].status = "BOMB";
          console.log("Hi4")
          updateBombCount(rand_row, rand_col);
          console.log("Hi5")
        } 
        
        console.log("Hi6")
        rand_row = getRandomInt(row);
        console.log("Hi7")
        rand_col = getRandomInt(column); 
        console.log("Hi8")
        
      }
      console.log("Hi4")
      console.log(rand_col, rand_row)
      // if 
    }
    console.log(coordinate)
  }

  // handleChange function for Slider
  const handleChange = (new_row, new_col, new_bomb) => {
    console.log(parseInt(new_col), parseInt(new_row), parseInt(new_bomb))
    setColumn(parseInt(new_col));  
    setRow(parseInt(new_row)); 
    setBomb(parseInt(new_bomb));   
  }

  return (
    
    <div className="flex justify-between  pt-[2vh]">
      {/* Sign up and Name */}
      <div className="flex flex-col  w-[30%] ">

        <div className="flex flex-row ">
          
            <button className="w-[25%] h-[5vh] mx-3 text-center bg-slate-500 hover:font-bold text-inherit  text-white rounded  shadow-md hover:shadow-lg">
              Sign up
            </button>

            <input
              placeholder={"your name..."}
              type="text"
              className="w-[80%] h-[5vh] px-[1%] mx-3 shadow-md hover:shadow-lg border-2 border-grey-700 rounded"
            />
        </div>

        <p className="m-3" style={{fontFamily: "Pangolin", fontSize: "150%"}}>
        <strong> Hello and welcome to msweeper.com!
          </strong>  <br/><br/>

        Type in your name to be on the Leaderboard! <br/><br/>
        Sign up for an account to view stats, compete with others, get in game coins and buy different themes! <br/><br/>
        
        </p>
        <div className="flex flex-row justify-between m-3">
          <button className="rounded bg-slate-600 text-slate-100 p-5 m-3 hover:bg-slate-400 hover:border-2 border-black"  style={{fontFamily: "Pangolin", fontSize: "150%"}}>How to Play</button> 
          <button className="rounded bg-slate-600 text-slate-100 p-5 m-3 hover:bg-slate-400 hover:border-2 border-black"  style={{fontFamily: "Pangolin", fontSize: "150%"}}>How does this website work</button>

        </div>
      </div>
      
      <div className="  bg-[#c2c2c2] p-4 border-solid border-4 border-l-white border-t-white border-r-[#999] border-b-[#999] max-h-fit">
        
        
        {/* Header */}  
        <div 
        className="flex bg-[#c0c0c0] px-2 
        border-solid border-4 
        border-r-white border-b-white 
        border-l-[#7b7b7b] border-t-[#7b7b7b] h-[10vh] justify-between"> 
        
        {/* Face  */}
        <div className="m-2 flex w-fit">

          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
        </div>
        <input type="image" src="/images/smile.png" className="m-2"/>
        
        <div className="m-2 flex w-fit">

          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
          <img src="/images/0.png"/>
        </div>
        </div>
        {/* Body */}
        <div className="mt-4 border-4 border-solid border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b] max-h-fit"> 
        <Board column={column} row={row} bomb={bomb} squareClickHandler={squareClickHandler} grid={grid} rel={rel}/>
        </div>
      </div>
      
      {/* Sliders */}
      <Slider handleChange={handleChange}/>
    </div>
    
  );
};

export default Game;


// function make_base() {
//   let square = new Image();
//   square.src = "../sprites/square.png";
//   square.onload = function () {
//     context.imageSmoothingEnabled = false;
//     for (let r = 0; r < ROW; r++) {
//       for (let c = 0; c < COL; c++) {
//         context.drawImage(square, start_x, start_y, rel_x, rel_y);

//         start_x += rel_x;
//       }
//       start_x = 0;
//       start_y += rel_y;
//     }
//   };
// }
// make_base();

// for (let i = 0; i <= 500; i++) {
//   var img = document.createElement("img");
//   img.src = "../sprites/square.png";
//   img.width = "30";
//   block.appendChild(img);
// }

// import { createBoard } from "./Board";

// const board = createBoard(2, 2, 2);

// board.forEach((row) => {
//   row.forEach((tile) => {
//     boardElement.append(tile.element);
//   });
// });
