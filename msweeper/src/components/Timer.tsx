import React from "react";
import { timerStatus } from "../utils/statuses";
import { useState, useEffect } from "react";
import { start } from "repl";
interface TimerProps {
  startTimer: boolean;
  gameOver: boolean;
  gameWon: boolean;
  setWinTime : any;
}

const Timer: React.FC<TimerProps> = ({ startTimer, gameOver, gameWon, setWinTime }) => {
  const [time, setTime] = useState(0);
  let timerInterval: ReturnType<typeof setInterval>;
  useEffect(() => {
    if (startTimer) {
      timerInterval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      if (!gameWon && !gameOver) {
        setTime(0);
      }
      if (gameWon) setWinTime(time);
    }

    // useeffect clean up function
    return () => {
      clearInterval(timerInterval);
    }; 
  }, [startTimer, gameWon, gameOver]);

  return (
    <div className="m-[0.3vw] h-[5vh] flex">
      <img
        onDragStart={(e) => e.preventDefault()}
        src={timerStatus[time > 999 ? 9 : Math.floor((time % 1000) / 100)]}
      />
      <img
        onDragStart={(e) => e.preventDefault()}
        src={timerStatus[time > 999 ? 9 : Math.floor((time % 100) / 10)]}
      />
      <img
        onDragStart={(e) => e.preventDefault()}
        src={timerStatus[time > 999 ? 9 : time % 10]}
      />
    </div>
  );
};

export default Timer;
