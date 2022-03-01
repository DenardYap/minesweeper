import React from "react";
import { timerStatus } from "../utils/squareStatus";
import { useState, useEffect } from "react";
import { start } from "repl";
interface TimerProps {
  startTimer: boolean;
  gameOver: boolean;
  gameWon: boolean;
}

const Timer: React.FC<TimerProps> = ({ startTimer, gameOver, gameWon }) => {
  const [time, setTime] = useState(0);
  let timerInterval: any;
  useEffect(() => {
    if (startTimer) {
      timerInterval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      if (!gameWon && !gameOver) {
        setTime(0);
      }
    }

    // useeffect clean up function
    return () => {
      clearInterval(timerInterval);
    };
  }, [startTimer, gameWon, gameOver]);

  return (
    <div className="m-[0.5vw] flex w-fit">
      {/* 000 */}
      <img
        onDragStart={(e) => e.preventDefault()}
        src={timerStatus[Math.floor((time % 1000) / 100)]}
      />
      <img
        onDragStart={(e) => e.preventDefault()}
        src={timerStatus[Math.floor((time % 100) / 10)]}
      />
      <img
        onDragStart={(e) => e.preventDefault()}
        src={timerStatus[time % 10]}
      />
    </div>
  );
};

export default Timer;
