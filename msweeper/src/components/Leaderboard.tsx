import React, { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import {readLeaderboard, updateLeaderboard} from "./databaseFunctions"
interface LeaderboardProps {}


/** for reference 
 * 
  const data1 = easy : {
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
};
medium : {
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
hard : {
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
  4: { name: "JingXian Chai 🔥", timeUsed: 200 },
};
 * 
 */
let cached : any = {};

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const [loaded, setLoaded] = useState(false);
  // const [cached, setCached] = useState({})
  // useEffect( () => {
  // }, [cached])
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
    <div className="ssm:mx-[4vw] ssm:my-[4vh] sm:my-[1vh] sm:mx-[0vw] sm:mr-[1vw] ssm:text-[5vw] sm:text-[1.5vw] basis-3/12 sm:order-3 ssm:order-4 flex flex-col text-left mr-[1vw] "> 
      {
        loaded ?
        
          <>
            <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold ">Hard</h1>
            <div className="flex flex-row sm:text-[1.5vw] justify-between mr-[1vw]">
              <div>

                <h3>1. {cached["hard"][0].name}  </h3>
                <h3>2. {cached["hard"][1].name}  </h3>
                <h3>3. {cached["hard"][2].name}  </h3>
                <h3>4. {cached["hard"][3].name}  </h3>
              </div>
              <div className="text-right">
                
                <h3> {cached["hard"][0].timeUsed > 999 ? 999 : cached["hard"][0].timeUsed} secs </h3>
                <h3> {cached["hard"][1].timeUsed > 999 ? 999 : cached["hard"][1].timeUsed} secs </h3>
                <h3> {cached["hard"][2].timeUsed > 999 ? 999 : cached["hard"][2].timeUsed} secs </h3>
                <h3> {cached["hard"][3].timeUsed > 999 ? 999 : cached["hard"][3].timeUsed} secs </h3>
              </div>
            </div>
            
            <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Medium</h1>
            <div className="flex flex-row sm:text-[1.5vw] justify-between mr-[1vw]">
              <div>

                <h3>1. {cached["medium"][0].name}  </h3>
                <h3>2. {cached["medium"][1].name}  </h3>
                <h3>3. {cached["medium"][2].name}  </h3>
                <h3>4. {cached["medium"][3].name}  </h3>
              </div>
              <div className="text-right">
                
                <h3> {cached["medium"][0].timeUsed > 999 ? 999 : cached["medium"][0].timeUsed} secs </h3>
                <h3> {cached["medium"][1].timeUsed > 999 ? 999 : cached["medium"][1].timeUsed} secs </h3>
                <h3> {cached["medium"][2].timeUsed > 999 ? 999 : cached["medium"][2].timeUsed} secs </h3>
                <h3> {cached["medium"][3].timeUsed > 999 ? 999 : cached["medium"][3].timeUsed} secs </h3>
              </div>
            </div>
            
            <h1 className="underline sm:text-[2.5vw] mb-[2vh] font-bold">Easy</h1>
            <div className="flex flex-row justify-between sm:text-[1.5vw] mr-[1vw]">
              <div>

                <h3>1. {cached["easy"][0].name}  </h3>
                <h3>2. {cached["easy"][1].name}  </h3>
                <h3>3. {cached["easy"][2].name}  </h3>
                <h3>4. {cached["easy"][3].name}  </h3>
              </div>
              <div className="text-right">
                
                <h3> {cached["easy"][0].timeUsed > 999 ? 999 : cached["easy"][0].timeUsed} secs </h3>
                <h3> {cached["easy"][1].timeUsed > 999 ? 999 : cached["easy"][1].timeUsed} secs </h3>
                <h3> {cached["easy"][2].timeUsed > 999 ? 999 : cached["easy"][2].timeUsed} secs </h3>
                <h3> {cached["easy"][3].timeUsed > 999 ? 999 : cached["easy"][3].timeUsed} secs </h3>
              </div>
            </div>
          </>
        : <h3> Waiting... </h3>
      }
    </div>
  );
};

export default Leaderboard;
