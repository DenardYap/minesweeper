import React from "react";

interface LeaderboardProps {}

const Leaderboard: React.FC<LeaderboardProps> = () => {
  return (
    <div>
      <h1 className="underline text-4xl my-5 font-bold">Hard</h1>
      <h3>1. ... 0 secs</h3>
      <h3>2. ... 0 secs</h3>
      <h3>3. ... 0 secs</h3>
      <h3>4. ... 0 secs</h3>
      <h1 className="underline text-4xl my-5 font-bold">Intermediate</h1>
      <h3>1. ... 0 secs</h3>
      <h3>2. ... 0 secs</h3>
      <h3>3. ... 0 secs</h3>
      <h1 className="underline text-4xl my-5 font-bold">Beginner</h1>
      <h3>1. ... 0 secs</h3>
      <h3>2. ... 0 secs</h3>
      <h3>3. ... 0 secs</h3>
    </div>
  );
};

export default Leaderboard;
