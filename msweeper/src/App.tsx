import React from "react";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import "./index.css";

function App() {
  return (
    <div  className=" bg-slate-200 ">
      
      <Game />
      <div className="flex text-left font-mono mx-10 ">
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;
