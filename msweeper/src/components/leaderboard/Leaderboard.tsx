import React, { useEffect, useState } from "react";
import Hamburger from "../Hamburger";
import {
  getLeaderBoard,
  LeaderboardData,
  readLeaderboard,
} from "../../utils/databaseFunctions";
import LeaderboardItem from "./LeaderboardData";
interface LeaderboardProps {}

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL!, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_API_KEY!,
      },
    }).then(async (res) => {
      // verify request here (request might be unauthorized)
      if (res.status == 200) {
        const leaderboardData = await res.json();
        setLeaderboardData(leaderboardData);
      }
    });
  }, []);
  // useEffect(() => {
  //   getLeaderBoard().then((data) => {
  //     setLeaderboardData(data);
  //   });
  // }, []);

  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   (async function () {
  //     // cache miss
  //     if (!Object.keys(cached).length) {
  //       cached["easy"] = await readLeaderboard("easy");
  //       cached["medium"] = await readLeaderboard("medium");
  //       cached["hard"] = await readLeaderboard("hard");
  //       setLoaded(true);
  //     }
  //   })();
  // }, []);

  return (
    <div className="ssm:mx-[4vw] ssm:my-[4vh] sm:my-[1vh] sm:mx-[0vw] sm:mr-[1vw] ssm:text-[5vw] sm:text-[1.5vw] basis-3/12 sm:order-3 ssm:order-4 flex flex-col text-left mr-[1vw] ">
      {leaderboardData ? (
        leaderboardData.map((l) => {
          return <LeaderboardItem key={l.mode} leaderboardData={l} />;
        })
      ) : (
        <div>Loading ... </div>
      )}
    </div>
  );
};

export default Leaderboard;
