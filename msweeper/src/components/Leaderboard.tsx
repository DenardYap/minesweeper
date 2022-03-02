import React from "react";
import Hamburger from "./Hamburger";

interface LeaderboardProps {}

const Leaderboard: React.FC<LeaderboardProps> = () => {
  return (
    <div className="ssm:mx-[4vw] ssm:text-[5vw] sm:text-[1.5vw] basis-3/12 sm:order-3 ssm:order-4 flex flex-col text-left font-mono mr-[1vw] "> 

    
    <div className="flex flex-row justify-end sm:my-[0.5vh] ssm:my-[2vh] mx-[5vw]">
      
     {/* <Hamburger/> */}
    </div>
      <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Hard</h1>
      <h3>1. ... 0 secs</h3>
      <h3>2. ... 0 secs</h3>
      <h3>3. ... 0 secs</h3>
      <h3>4. ... 0 secs</h3>
      <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Intermediate</h1>
      <h3>1. ... 0 secs</h3>
      <h3>2. ... 0 secs</h3>
      <h3>3. ... 0 secs</h3>
      <h3>4. ... 0 secs</h3>
      <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Beginner</h1>
      <h3>1. ... 0 secs</h3>
      <h3>2. ... 0 secs</h3>
      <h3>3. ... 0 secs</h3>
      <h3>4. ... 0 secs</h3>
    </div>
  );
};

export default Leaderboard;
