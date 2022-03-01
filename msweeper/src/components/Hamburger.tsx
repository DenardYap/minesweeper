import React, { useState } from 'react'

const Hamburger = () => {

  const [clicked, setClicked] = useState(false);
  let handleClick = () => {
    clicked ? setClicked(false) : setClicked(true);
  }
  return (
    <div className='relative cursor-pointer' onClick={handleClick}> 
      
      {clicked ? 
      <div className='burger-menu-container-open' >
        <div className='burger-menu'></div>
      </div>
      :
      <div className='burger-menu-container '>
        <div className='burger-menu'></div>
      </div>}
    </div>
  ) 
}

export default Hamburger