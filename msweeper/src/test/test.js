import React from "react";

const Test = () => {
  return (
    <div className="flex justify-center">
      <div className="flex-none w-32 bg-blue-200">01</div>
      <div className="grow w-32 bg-yellow-200">02</div>
      <div className="shrink grow w-16 bg-green-200">03</div>
    </div>
  );
};

export default Test;
