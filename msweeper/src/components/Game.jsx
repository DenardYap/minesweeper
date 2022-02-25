/**Todo
 * 1) smoothen on other browsers
 * 2)
 */
import React, { useState } from "react";
import Board from "./Board";

const CUR_WIDTH = window.innerWidth;
const CUR_HEIGHT = window.innerHeight;

// max size: 30 x 30
const ROW = 10;
const COL = 10;
const DEF_SIZE = 32; //todo: change
let board = Array(ROW)
  .fill(null)
  .map(() => Array(COL));
// 1000 // 20
let height = DEF_SIZE * ROW;
let width = DEF_SIZE * COL;

// if (width >= CUR_WIDTH) {
//   let factor = ROW / COL;
//   width = CUR_WIDTH;
//   height = CUR_WIDTH * factor;
// }
console.log(CUR_WIDTH, width);

let rel_x = width / COL;
let rel_y = height / ROW;
let start_x = 0;
let start_y = 0;

const Game = () => {
  // const canvas = React.useRef(null);

  // React.useEffect(() => {
  //   const context = canvas.current.getContext("2d");
  //   let square = new Image();
  //   square.src = "/images/square.png";

  //   square.onload = function () {
  //     context.imageSmoothingEnabled = false;
  //     for (let r = 0; r < ROW; r++) {
  //       for (let c = 0; c < COL; c++) {
  //         context.drawImage(square, start_x, start_y, rel_x, rel_y);
  //         board[r][c] = new Square();

  //         start_x += rel_x;
  //       }
  //       start_x = 0;
  //       start_y += rel_y;
  //     }
  //   };
  // }, []);

  // for
  //   for
  //     <Square key= {r, c}  />

  //     const Square = () => {
  //       change image
  //       return (
  //         <div></div>
  //     }</Square>

  return (
    // className="mt-8 border-4 border-solid border-r-white border-b-white border-t-[#7b7b7b] bordeer-l-[#7b7b7b]"

    // Container
    <div className=" h-[85vh] max-w-[98vw] bg-black">
      {/* Header */}
      {/* Face */}

      {/* Body */}
      <canvas ref={canvas} className="" height={height} width={width}></canvas>
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
