import React from 'react'
import { timerStatus } from '../utils/statuses'

interface FlagProps  {
  flagLeft: number
}

const Flag: React.FC<FlagProps> = ({flagLeft}) => {
  return (
    
    <div className="m-[0.3vw] flex h-[5vh]">
        <img onDragStart={ (e) => e.preventDefault()} src={timerStatus[Math.floor(flagLeft%1000 / 100)]} />
        <img onDragStart={ (e) => e.preventDefault()} src={timerStatus[Math.floor(flagLeft%100 / 10)]} />
        <img onDragStart={ (e) => e.preventDefault()} src={timerStatus[Math.floor(flagLeft%10)]} />
    </div>
  )
}

export default Flag