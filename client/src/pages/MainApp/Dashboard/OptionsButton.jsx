import React, { useState } from 'react';


export default ({ handleOptionsSelection }) => {
  const [ showOptionsMenu, setShowOptionsMenu ] = useState(null);

  function closeOptionsMenu() {
    setShowOptionsMenu(null);
  }

  function openOptionsMenu(event) {
    setShowOptionsMenu(event.currentTarget);
  }

  function handleClick(event) {
    handleOptionsSelection(event.target.innerText);
    closeOptionsMenu();
  }

  return(
    <>
      <button
        id="options-button"
        variant="outlined" 
        size="large"
        aria-controls={!!showOptionsMenu ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={!!showOptionsMenu ? 'true' : undefined}
        onClick={openOptionsMenu}
      >
        Options...
      </button>
      <div 
        id="options-menu"
        // anchorEl={showOptionsMenu}
        open={!!showOptionsMenu} 
        onClose={closeOptionsMenu}
        // MenuListProps={{
        //   'aria-labelledby': 'options-button',
        // }}
      >
        <div className='options-menu-box'>
          <a onClick={handleClick}>Skip</a>
          <hr/>
          <a disabled onClick={handleClick}>Stash</a>
          <hr/>
          <a onClick={handleClick}>Delete</a>
        </div>
      </div>
    </>
  );
}