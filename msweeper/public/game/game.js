/**Todo
 * 1) smoothen on other browsers
 * 2)
 */
const CUR_WIDTH = window.innerWidth;
const CUR_HEIGHT = window.innerHeight;
const ROW = 20;
const COL = 40;
const DEF_SIZE = 16;

let block = document.getElementById("main-canvas");
block.height = DEF_SIZE * ROW;
block.width = DEF_SIZE * COL;
let context = block.getContext("2d");

let rel_x = block.width / COL;
let rel_y = block.height / ROW;
console.log(rel_x, block.offsetWidth);
console.log(window.innerWidth);
console.log(rel_y, block.offsetHeight);
console.log(window.innerHeight);
let start_x = 0;
let start_y = 0;

// for (let c = 0; c < 20; c++) {
//   square.onload = function () {
//     context.imageSmoothingEnabled = false;
//     context.drawImage(square, start_x, start_y, rel_x, rel_y);
//   };
//   start_x += rel_x;
//   console.log(start_x);
// }

function make_base() {
  let square = new Image();
  console.log(square);
  square.src = "../sprites/square.png";
  square.onload = function () {
    context.imageSmoothingEnabled = false;
    for (let r = 0; r < ROW; r++) {
      for (let c = 0; c < COL; c++) {
        context.drawImage(square, start_x, start_y, rel_x, rel_y);

        start_x += rel_x;
      }
      start_x = 0;
      start_y += rel_y;
    }
  };
}
make_base();

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
