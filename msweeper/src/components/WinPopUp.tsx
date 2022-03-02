import React from 'react'

interface WinPopUpProps {
    gameWon : boolean;
}

const WinPopUp: React.FC<WinPopUpProps> = ({gameWon}) => {
  return (
      
    gameWon ? (
        <div 
        className="flex flex-col absolute items-center rounded
        bg-slate-600 text-slate-100 text-center sm:text-[1.2vw] ssm:text-[3vw] 
        m-auto ssm:w-[80vw] sm:w-[20vw] h-[17.5vh] left-0 right-0 top-0 bottom-0">
        <label className="leading-[10vh] bg-slate-600">
            Let's be on the leaderboard 😎
        </label>
        <input
        placeholder={"your name..."}
            className="rounded shadow-2xl w-[90%] h-[5vh] sm:px-[0.5vw] ssm:px-[2vw] bg-slate-400 text-white hover:bg-slate-200 hover:text-black hover:placeholder-black placeholder-white "
            type="text"
            autoFocus
        />
        </div>
    ) : 
        <></>
    )
}

export default WinPopUp