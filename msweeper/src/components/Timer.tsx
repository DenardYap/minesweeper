import React from 'react'
import { timerStatus } from '../utils/squareStatus'
import {useState, useEffect} from 'react';
interface TimerProps {
  startTimer: boolean
}

const Timer: React.FC<TimerProps> = ({startTimer}) => {
  // 123 mod 10 = 3
  // 123 mod 100 = 23 / 10 = 2
  // 123 mod 1000 = 123 / 100 = 1
  // 9 9
  // 9 = 0
  // 
  
  const [time, setTime] = useState(0);
  useEffect( () => {
    if (startTimer) {
      setInterval( () => {
        setTime((time) => time + 1);
  
        
      }, 1000);   
    }
  }, [startTimer])

  return (
    <div className="m-[0.5vw] flex w-fit">
      {/* 000 */}
    <img src={timerStatus[Math.floor(time%1000 / 100)]} /> 
      <img src={timerStatus[Math.floor(time%100 / 10)]} />
      <img src={timerStatus[time % 10]} />
    </div>
  )
}

export default Timer