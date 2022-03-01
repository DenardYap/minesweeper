import React from 'react'
import { timerStatus } from '../utils/squareStatus'
import {useState, useEffect} from 'react';
import { start } from 'repl';
interface TimerProps {
  startTimer: boolean
  gameOver: boolean
  gameWon: boolean
}

const Timer: React.FC<TimerProps> = ({startTimer, gameOver, gameWon}) => {
  
  const [time, setTime] = useState(0);
  let timerInterval : any;
  useEffect( () => {
    if (startTimer) {
      timerInterval = setInterval( () => {
        setTime((time) => time + 1);
        // if (!startTimer) {
        //   clearInterval(timerInterval);
        // }
      }, 1000);   
    }
    
    // useeffect clean up function
    return () => {
      clearInterval(timerInterval);
      console.log("timer reset", gameOver, gameWon)
      if (!gameWon && !gameOver){
        setTime(0);
      }
    }
  }, [startTimer, gameWon, gameOver])

  return (
    <div className="m-[0.5vw] flex w-fit">
      {/* 000 */}
    <img onDragStart={ (e) => e.preventDefault()} src={timerStatus[Math.floor(time%1000 / 100)]} /> 
      <img onDragStart={ (e) => e.preventDefault()} src={timerStatus[Math.floor(time%100 / 10)]} />
      <img onDragStart={ (e) => e.preventDefault()} src={timerStatus[time % 10]} />
    </div>
  )
}

export default Timer