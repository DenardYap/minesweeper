import React from "react";
import { LeaderboardData } from "../../utils/databaseFunctions";

interface LeaderboardItemProps {
  leaderboardData: LeaderboardData;
}
function capitalize(str : string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  leaderboardData,
}) => {
  return (
    <div className="mb-[2vh]">
      <h1 className="font-bold underline text-3xl">{capitalize(leaderboardData.mode)}</h1>
      {leaderboardData.rank.map((r, idx) => {
        return (
          <LeaderboardSubItem key={idx} index={idx+1} name={r.name} timeUsed={r.timeUsed} />
        );
      })}
    </div>
  );
};

interface LeaderboardSubItemProps {
  index: number,
  name: string;
  timeUsed: number;
}

const LeaderboardSubItem: React.FC<LeaderboardSubItemProps> = ({
  index,
  name,
  timeUsed,
}) => {
  return (
    <div className="flex flex-row justify-between items-center ">
      <div>{index}. {name}</div>
      <div>{timeUsed} secs</div>
    </div>
  );
};

export default LeaderboardItem;
