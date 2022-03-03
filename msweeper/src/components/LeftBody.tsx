import React from 'react'
import SignUpAndText from './SignUpAndText'
import Slider from './Slider'
import DifficultyButtons from "./DifficultyButtons"

interface LeftBodyProps {
    handleSliderChange : any;
}
const LeftBody: React.FC<LeftBodyProps> = ({handleSliderChange}) => {


  return (
    <div className="basis-3/12 sm:order-1 ssm:order-2 flex flex-col relative mt-[2vh] ">
        <SignUpAndText></SignUpAndText>
        <DifficultyButtons handleSliderChange={handleSliderChange}></DifficultyButtons>
        <Slider handleSliderChange={handleSliderChange} />
    </div>
  )
}

export default LeftBody