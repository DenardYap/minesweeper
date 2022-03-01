import React from "react";
import { useState, useEffect } from "react";
import { faceStatus } from "../utils/squareStatus";
interface FaceProps {
  reset: any;
  faceSrc: string;
  handleFace: any;
}

const Face: React.FC<FaceProps> = ({ reset, faceSrc, handleFace }) => {
  return (
    <input
      onDragStart={(e) => e.preventDefault()}
      type="image"
      onMouseDown={handleFace}
      onMouseUp={handleFace}
      onMouseLeave={handleFace}
      onMouseEnter={handleFace}
      onClick={reset}
      src={faceSrc}
      className="m-[0.5vw]"
    />
  );
};

export default Face;
