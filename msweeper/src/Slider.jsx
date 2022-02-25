import React from 'react'
import { useState } from 'react'

const Slider = () => {

  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [bomb, setBomb] = useState(10);

  const changeRow = (e) => setRow(e.target.value);
  const changeCol = (e) => setCol(e.target.value);
  const changeBomb = (e) => setBomb(e.target.value);

  return (
    
    <div className="basis-1/4 flex flex-row text-center items-center justify-center justify-items-center">
        <div className="flex flex-col">

            <label htmlFor="row-slider">Row</label>
            <input type="range" min = "10" max = "30"  defaultValue="10" step="1" id="row-slider" name ="row-slider" orient="vertical" onChange={changeRow} />
            <h2>{row}</h2>
        </div>

        <div className="flex flex-col">
            <label htmlFor="col-slider">Column</label>
            <input type="range" min = "10" max = "30" defaultValue="10" step="1" id="col-slider" name="col-slider" orient="vertical"  onChange={changeCol} />
            <h2>{col}</h2>
        </div>

        <div className="flex flex-col">
            <label htmlFor="bomb-slider">Bomb</label>
            <input type="range" min = "10" max = "150" defaultValue="10" step="1" id="bomb-slider" name="bomb-slider" orient="vertical"  onChange={changeBomb} />
            <h2>{bomb}</h2>
        </div>
</div>
  )
}

export default Slider