import React from "react";
import { useState, useEffect } from "react";
import { faceStatus } from "../utils/statuses";
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
      onClick={(e) => reset()}
      src={faceSrc}
      className="my-[0.3vw]  h-[5vh]"
    />
  );
};

export default Face;
