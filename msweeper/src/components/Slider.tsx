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
      <div className="sliders flex flex-row rotate-90">
        <div className="rotate-[-90]">{bomb}</div>
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
          <label htmlFor="bomb-slider">Bomb</label>

      </div>
    </form>
  );
};

export default Slider;
