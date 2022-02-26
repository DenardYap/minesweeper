import React from "react";
// import "./game/game.js"
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import "./index.css";

const App = () => {
  return (
    <div className=" bg-slate-200">
        
        <Game/>
        
        <div className="flex text-left font-mono mx-10">
          <Leaderboard />
        </div>
    </div>
  );
};

export default App;
