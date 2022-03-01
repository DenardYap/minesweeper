import React, { useState } from 'react'

const Hamburger = () => {

  const [clicked, setClicked] = useState(false);
  let handleClick = () => {
    clicked ? setClicked(false) : setClicked(true);
  }
  return (
      clicked ? 
      <div className='burger-menu-container-open' onClick={handleClick}>
        <div className='burger-menu'></div>
      </div>
      :
      <div className='burger-menu-container' onClick={handleClick}>
        <div className='burger-menu'></div>
      </div>
  ) 
}

export default Hamburger