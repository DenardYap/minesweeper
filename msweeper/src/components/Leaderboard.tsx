import React, { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import {readLeaderboard, updateLeaderboard} from "./server"
interface LeaderboardProps {}

let cached : any = {}

/** for reference 
 * 
  const data1 = {
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
};
 * 
 */

const data1 = {
  0: { name: "Jing Xian Chai 🔥", timeUsed: 200 },
};

const Leaderboard: React.FC<LeaderboardProps> = () => {

  updateLeaderboard("hard", data1)
  const [loaded, setLoaded] = useState(false);

  useEffect( () => {
    (async function() {

      // cache miss
      if (!Object.keys(cached).length) {
        cached["easy"] = await readLeaderboard("easy");
        cached["medium"] = await readLeaderboard("medium");
        cached["hard"] = await readLeaderboard("hard");
        setLoaded(true);
      }
      })();

    }, [])

  return  (
    <div className="ssm:mx-[4vw] ssm:my-[4vh] sm:my-[0vh] sm:mx-[0vw] ssm:text-[5vw] sm:text-[1.5vw] basis-3/12 sm:order-3 ssm:order-4 flex flex-col text-left mr-[1vw] "> 
      {
        loaded ?
        
          <>
            <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Hard</h1>
            <h3>1. {cached["hard"][0].name} {cached["hard"][0].timeUsed} secs </h3>
            <h3>2. {cached["hard"][1].name} {cached["hard"][1].timeUsed} secs </h3>
            <h3>3. {cached["hard"][2].name} {cached["hard"][2].timeUsed} secs </h3>
            <h3>4. {cached["hard"][3].name} {cached["hard"][3].timeUsed} secs </h3>
            <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Medium</h1>
            <h3>1. {cached["medium"][0].name} {cached["medium"][0].timeUsed} secs </h3>
            <h3>2. {cached["medium"][1].name} {cached["medium"][1].timeUsed} secs </h3>
            <h3>3. {cached["medium"][2].name} {cached["medium"][2].timeUsed} secs </h3>
            <h3>4. {cached["medium"][3].name} {cached["medium"][3].timeUsed} secs </h3>
            <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Easy</h1>
            <h3>1. {cached["easy"][0].name} {cached["easy"][0].timeUsed} secs </h3>
            <h3>2. {cached["easy"][1].name} {cached["easy"][1].timeUsed} secs </h3>
            <h3>3. {cached["easy"][2].name} {cached["easy"][2].timeUsed} secs </h3>
            <h3>4. {cached["easy"][3].name} {cached["easy"][3].timeUsed} secs </h3>
          </>
        : <h3> Waiting... </h3>
      }
    </div>
  );
};

export default Leaderboard;
