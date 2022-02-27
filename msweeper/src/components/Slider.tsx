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
      className="flex flex-col justify-around w-[28%]"
    >
      <div className="basis-1/4 flex flex-col text-center items-center justify-center justify-items-center">
        <div className="flex flex-row space-x-5">
          <label htmlFor="row-slider">Row</label>
          <input
            type="range"
            min="10"
            max="30"
            defaultValue="10"
            step="1"
            id="row-slider"
            name="row-slider"
            // orient="vertical"
            onChange={changeRow}
          />
          <h2>{row}</h2>
        </div>

        <div className="flex flex-row space-x-5">
          <label htmlFor="col-slider">Column</label>
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
          <h2>{col}</h2>
        </div>
        <div className="flex flex-row space-x-5">
          <label htmlFor="bomb-slider">Bomb</label>
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
          <h2>{bomb}</h2>
        </div>
      </div>
      <div className="flex justify-center">
        <input
          type="submit"
          value="Submit"
          className="w-[33%] rounded bg-slate-600 text-slate-100 py-3 hover:bg-slate-400 hover:border-2 border-black hover:cursor-pointer "
        />
      </div>
    </form>
  );
};

export default Slider;
