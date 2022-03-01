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

  const changeRow = (e: any) => setRow(e.target.value);
  const changeCol = (e: any) => setCol(e.target.value);
  const changeBomb = (e: any) => setBomb(e.target.value);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSliderChange(row.toString(), col.toString(), bomb.toString());
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-around w-[28vw] mx-[1vw]"
    >
      <div className="flex flex-row justify-center items-center">
        <div className="sliders" id="sliders-row">
          
          <div className="row-count " >{row}</div>
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
            <label htmlFor="col-slider" className="rotate-90">Col</label>

          </div>

          <div className="sliders" id="sliders-bomb">
            <div className="bomb-count">{bomb}</div>
              <input
                type="range"
                min="10"
                max="150"
                defaultValue="10"
                step="1"
                id="bomb-slider"
                name="bomb-slider"
                // className="-rotate-90"
                onChange={changeBomb}
              />
            <label htmlFor="bomb-slider" className="rotate-90">Bomb</label>
          </div>

      </div>
      
      <input  style={{ fontFamily: "Montserrat-medium" }} className="cursor-pointer absolute bottom-[10vh] right-[13vw] bg-slate-600 rounded text-slate-50 p-[1vw] hover:bg-slate-400 hover:border-2 border-black" type="submit" />
    </form>
  );
};

export default Slider;
