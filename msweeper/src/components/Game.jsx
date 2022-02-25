/**Todo
 * 1) smoothen on other browsers
 * 2)
 */
import React, { useEffect, useState } from "react";
import Board from "./Board";
import Slider from "./Slider";

const DEFAULT = {
  col: 10,
  row: 10,
  bomb: 10
}

const Game = () => {
  const [column, setColumn] = useState(DEFAULT.col);
  const [row, setRow] = useState(DEFAULT.row);
  const [bomb, setBomb] = useState(DEFAULT.bomb);
  // const [rel, setRel] = useState((1/Math.max(row, column) * 75).toString() + "vh"); 
    
  const handleChange = (new_col, new_row, new_bomb) => {
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
      
      <div className="  bg-[#c2c2c2] p-4 border-solid border-4 border-l-white border-t-white border-r-[#999] border-b-[#999]">
        
        
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
        <div className="mt-4 border-4 border-solid border-r-white border-b-white border-l-[#7b7b7b] border-t-[#7b7b7b]"> 
        <Board column={column} row={row} bomb={bomb}/>
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
