import React from 'react'

interface DifficultyButtonsProps {
    handleSliderChange : any;
}
const DifficultyButtons : React.FC<DifficultyButtonsProps> = ({handleSliderChange}) => {
  return (
    
    <div className="flex flex-row justify-around ssm:mt-[1vh] sm:mt-[3vh]">
        <button 
        className="basis-3/12 cursor-pointer shadow-button hover:shadow-lg 
        font-bold bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black
        mx-[1vw] ssm:py-[2vh]"
        onClick={(e) => handleSliderChange(10, 10, 10)}>
        Easy
        </button>
        <button 
        className="basis-3/12 cursor-pointer shadow-button hover:shadow-lg
        font-bold bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black
        mx-[1vw] ssm:py-[2vh] "
        onClick={(e) => handleSliderChange(16, 16, 40)}>
        Medium
        </button>
        <button 
        className="basis-3/12 cursor-pointer shadow-button hover:shadow-lg
        font-bold bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black
        mx-[1vw] ssm:py-[2vh] "
        onClick={(e) => handleSliderChange(22, 22, 100)}>
        Hard
      </button>
  </div>
  )
}

export default DifficultyButtons