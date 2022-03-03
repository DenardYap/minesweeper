import React from "react";
import { useState, useEffect } from "react";

interface SliderProps {
  handleSliderChange: (
    sliderNewRow: string,
    sliderNewCol: string,
    sliderNewBomb: string
  ) => void;
}

const Slider: React.FC<SliderProps> = ({ handleSliderChange }) => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [bomb, setBomb] = useState(10);
  //bomb ratio should be 30% of row * col
  const [maxBomb, setMaxBomb] = useState(Math.floor(row * col * 0.3))
  

  const changeRow = (e: any) => {
    setRow(e.target.value);
    const cur_max_bomb = Math.floor(e.target.value * col * 0.3);
    setMaxBomb(cur_max_bomb);
    if (bomb > cur_max_bomb) {
      setBomb(cur_max_bomb)
    }
  }

  const changeCol = (e: any) => {
    setCol(e.target.value);
    
    const cur_max_bomb = Math.floor(row * e.target.value * 0.3);
    setMaxBomb(cur_max_bomb);
    if (bomb > cur_max_bomb) {
      setBomb(cur_max_bomb)
    }
  }
  const changeBomb = (e: any) => setBomb(e.target.value);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMaxBomb(Math.floor(row * col * 0.3));
    if (bomb > Math.floor(row * col * 0.3)) {
      setBomb(Math.floor(row * col * 0.3))
      handleSliderChange(row.toString(), col.toString(), Math.floor(row * col * 0.3).toString());
      
    }
    else{
      
      handleSliderChange(row.toString(), col.toString(), bomb.toString());
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  sm:relative ssm:order-3 justify-around mx-[1vw] items-center"
    > 
      <div className="order-1 ssm:absolue flex flex-row justify-center">
        <div className=" ssm:relative sm:absolute sm:left-[40%] ssm:top-[10vh] sm:top-[350%] sliders">
          
          <div className="row-count" >{row}</div>
              <input
                type="range"
                min="10"
                max="30"
                defaultValue="10"
                step="1"
                id="row-slider"
                name="row-slider"
                // className="-rotate-90"
                onChange={changeRow}
              />
            <label htmlFor="row-slider" className="bg-transparent rotate-90">Row</label>
        </div>
          
        <div className=" ssm:relative sm:absolute ssm:top-[10vh] sm:top-[350%] sliders">
          <div className="col-count">{col}</div>
              <input
                type="range"
                min="10"
                max="30"
                defaultValue="10"
                step="1"
                id="col-slider"
                name="col-slider"
                // className="-rotate-90"
                onChange={changeCol}
              />
            <label htmlFor="col-slider" className="bg-transparent rotate-90">Column</label>

          </div>

          <div className=" ssm:relative sm:absolute sm:right-[40%] ssm:top-[10vh] sm:top-[350%] sliders">
            <div className="bomb-count">{bomb}</div>
              <input
                type="range"
                min="10"
                max= {maxBomb}
                defaultValue= "10"
                step="1"
                id="bomb-slider"
                name="bomb-slider"
                // className="-rotate-90"
                onChange={changeBomb}
              />
            <label htmlFor="bomb-slider" className="bg-transparent rotate-90">Bomb</label>
          </div>

      </div>
      
      <input className="order-2 sm:relative cursor-pointer 
       bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black
       shadow-button hover:shadow-lg font-bold 
      sm:top-[800%] ssm:w-[80%] sm:w-[40%] ssm:mt-[22vh] sm:mt-[0vh]" type="submit" />
    </form>
  );
};

export default Slider;
