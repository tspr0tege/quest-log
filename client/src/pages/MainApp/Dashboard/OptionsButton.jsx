import React, { useState } from 'react';
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';

import { Dashboard as styles} from '@src/styles'

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
      <Button
        id="options-button"
        variant="outlined" 
        size="large"
        aria-controls={!!showOptionsMenu ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={!!showOptionsMenu ? 'true' : undefined}
        onClick={openOptionsMenu}
      >
        Options...
      </Button>
      <Menu 
        id="options-menu"
        anchorEl={showOptionsMenu}
        open={!!showOptionsMenu} 
        onClose={closeOptionsMenu}
        MenuListProps={{
          'aria-labelledby': 'options-button',
        }}
      >
        <Box sx={styles.optionsMenuBox}>
          <MenuItem onClick={handleClick}>
            Skip
          </MenuItem>
          <Divider />
          <MenuItem disabled onClick={handleClick}>
            Stash
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClick}>
            Delete
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}