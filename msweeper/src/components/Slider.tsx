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
  

  const changeRow = (e: any) => setRow(e.target.value);
  const changeCol = (e: any) => setCol(e.target.value);
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
      className="flex flex-col relative justify-around mx-[1vw] items-center"
      style={{ fontFamily: "Montserrat-medium" }}
    >
      <div className="flex flex-row justify-center">
        <div className="sliders" id="sliders-row">
          
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
            <label htmlFor="row-slider" className="rotate-90">Row</label>
        </div>
          
        <div className="sliders" id="sliders-col">
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
            <label htmlFor="col-slider" className="rotate-90">Column</label>

          </div>

          <div className="sliders" id="sliders-bomb">
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
            <label htmlFor="bomb-slider" className="rotate-90">Bomb</label>
          </div>

      </div>
      
      <input  style={{ fontFamily: "Montserrat-medium" }} className="shadow-md hover:shadow-lg font-bold cursor-pointer w-[40%] relative top-[800%] bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black" type="submit" />
    </form>
  );
};

export default Slider;
