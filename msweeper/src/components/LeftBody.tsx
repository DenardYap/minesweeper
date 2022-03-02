import React from 'react'
import SignUpAndText from './SignUpAndText'
import Slider from './Slider'

interface LeftBodyProps {
    handleSliderChange : any;
}
const LeftBody: React.FC<LeftBodyProps> = ({handleSliderChange}) => {


  return (
    <div className="basis-3/12 flex flex-col relative mt-[2vh] ">
        <SignUpAndText></SignUpAndText>
    <div className="flex flex-row mt-[3vh]">
      <button 
      className="shadow-md hover:shadow-lg mx-[1vw] font-bold cursor-pointer bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black"
      onClick={(e) => handleSliderChange(10, 10, 10)}>
        Beginner
        </button>
      <button 
      className="shadow-md hover:shadow-lg mx-[1vw] font-bold cursor-pointer bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black"
      onClick={(e) => handleSliderChange(16, 16, 40)}>
        Intermediate
        </button>
      <button 
      className="shadow-md hover:shadow-lg mx-[1vw] font-bold cursor-pointer bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black"
      onClick={(e) => handleSliderChange(22, 22, 100)}>
        Hard
        </button>
    </div>
        <Slider handleSliderChange={handleSliderChange} />
    </div>
  )
}

export default LeftBody