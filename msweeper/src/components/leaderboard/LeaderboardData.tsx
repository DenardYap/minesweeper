import React from "react";
import { LeaderboardData } from "../../utils/databaseFunctions";

interface LeaderboardItemProps {
  leaderboardData: LeaderboardData;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  leaderboardData,
}) => {
  return (
    <div>
      <h1 className="text-red-400">{leaderboardData.mode}</h1>
      {leaderboardData.rank.map((r, idx) => {
        return (
          <LeaderboardSubItem key={idx} name={r.name} timeUsed={r.timeUsed} />
        );
      })}
    </div>
  );
};

interface LeaderboardSubItemProps {
  name: string;
  timeUsed: number;
}

const LeaderboardSubItem: React.FC<LeaderboardSubItemProps> = ({
  name,
  timeUsed,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div>{name}</div>
      <div>{timeUsed}</div>
    </div>
  );
};

export default LeaderboardItem;
