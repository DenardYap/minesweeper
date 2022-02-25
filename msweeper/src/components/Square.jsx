import React from 'react'
import { useState } from 'react'
import square_status from './square_status'

const moves = {
    0: [0, 1],
    1: [0, -1],
    2: [1, 0],
    3: [-1, 0],
    4: [1, 1],
    5: [1, -1],
    6: [-1, 1],
    7: [-1, -1],
}
/** HIGH LEVEL OVERVIEW
 * 
 * 
 * 
 * Game.js
 * board - 2d array 
 * 
 * row = 3
 * col = 2
 * 
 * [[x x] * 3]
 * 
 * [1,2,3].map((e) => )
 * 
 * status, setstaus
 * 
 * board.map((r) => {
 *  r.map(c) => {
 *  return <Square key={(r, c)} status={status} click={clickfunction} />
 * }
 * })
 * 
 * Image.js
 * 
 * export const image {
 *  name -> image string
 * }
 * 
 * Square.js 
 * 
 * const square = ({status, click}) => {
 *  
 *  img = image.name
 * 
 *  return <img src={image.name} onclick={click}>
 * 
 * }
 */
const Square = () => {
    //default image
    const [status, setStatus] = useState(square_status.SQUARE)
    
    // coordinate?

    const clickHandler = () =>{
        /** Everytime an image is clicked, this function is called
         *  1) Check current grid's status, 
         *  - if bomb, then lose
         *  - if flag or question, do nothing 
         *  - if blanked, check if vicinity has bomb, keep track of the 
         *    current bomb value and render the respective image 
         */

        if (status == square_status.BOMB) {
            //make it lose
        }
        else if (status == square_status.BLANK) {
            // perform BFS/DFS  
            let count = 0 

            for (let i = 0; i < 8; i++) {
                let new_r = 
                let new_c = 
            }
        }
    }
  return (
    <div onClick={clickHandler}>Square</div>
  )
}

export default Square