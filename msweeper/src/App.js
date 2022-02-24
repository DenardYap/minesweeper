import React from "react";
import "./index.css";
// import "./game/game.js"
import Game from "./Game"
import Leaderboard from "./Leaderboard";

const App = () => {
  return <div  className=" bg-gray-100">
      <div id="main-container flex flex-column my-1 items-center">

        <div id="nav-bar" className="flex flex-row justify-between">
            
            <input placeholder={"your name..."} type="text" className="px-2 shadow-md hover:shadow-lg border-2 border-grey-700 rounded m-5"/>
            <button  className="bg-slate-500 hover:font-bold text-inherit text-white rounded p-2 m-5 shadow-md hover:shadow-lg">Sign up</button>
        </div>

            <Game></Game>
        <div className="flex text-left font-mono mx-10">

          <Leaderboard></Leaderboard>
        </div>
      </div>

      </div>;
};

export default App;
