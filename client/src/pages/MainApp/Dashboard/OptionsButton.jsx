import React, { useState, useRef } from 'react';

import Popup from '@src/components/Popup';

export default ({ handleOptionsSelection }) => {
  const buttonRef = useRef(null)
  const [ showOptionsMenu, setShowOptionsMenu ] = useState(false);

  // function closeOptionsMenu() {
  //   setShowOptionsMenu(null);
  // }

  // function openOptionsMenu(event) {
  //   setShowOptionsMenu(event.currentTarget);
  // }

  function handleClick(event) {
    // console.log(event.target.innerText)
    handleOptionsSelection(event.target.innerText);
    setShowOptionsMenu(false);
  }

  return(
    <>
      <button
        ref={buttonRef}
        id="options-button"
        variant="outlined" 
        size="large"
        aria-controls={!!showOptionsMenu ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={!!showOptionsMenu ? 'true' : undefined}
        onClick={() => {setShowOptionsMenu(!showOptionsMenu)}}
      >
        Options...
      </button>
    
      <Popup 
        id="options-menu"
        anchorRef={buttonRef} 
        isOpen={showOptionsMenu} 
        onClose={() => setShowOptionsMenu(false)}
      >          
        <div className='options-menu-box'>
          <a onClick={handleClick}>Skip</a>
          <hr/>
          {/* <a disabled onClick={handleClick}>Stash</a>
          <hr/> */}
          <a onClick={handleClick}>Delete</a>
        </div>
      </Popup>
    </>
  );
}