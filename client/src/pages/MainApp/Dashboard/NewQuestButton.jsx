import React, { useState } from 'react';
import { createSvgIcon } from '@mui/material/utils';
import { Box, Button, IconButton, Menu, TextField } from '@mui/material';

import { Dashboard as styles } from '@src/styles';

const AddIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Add'
);

export default ({ createQuest }) => {
  const [ showNewTaskPopup, setShowNewTaskPopup ] = useState(null);

  function closeNewTaskPopup() {
    setShowNewTaskPopup(null);
  }

  function openNewTaskPopup(event) {
    setShowNewTaskPopup(event.currentTarget);
  }

  return (
    <>
      <IconButton 
        id="new-task-button"
        size="large" 
        sx={styles.iconButton}
        aria-controls={!!showNewTaskPopup ? 'new-task-popup' : undefined}
        aria-haspopup="true"
        aria-expanded={!!showNewTaskPopup ? 'true' : undefined}
        onClick={openNewTaskPopup}
      >
        <AddIcon />
      </IconButton>
      <Menu
        id="new-task-popup"
        anchorEl={showNewTaskPopup}
        open={!!showNewTaskPopup}
        onClose={closeNewTaskPopup}
        MenuListProps={{
          'aria-labelledby': 'new-task-button'
        }}
      >
        <Box component="form" sx={{minWidth: '30vw'}}>
          <TextField 
            autoFocus
            required
            fullWidth
            margin="normal"
            id="title"
            name="title"
            // label="Enter a new task" causing focus error and unable to type "e" in the field
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={createQuest}
          >
            Add
          </Button>
        </Box>
      </Menu>
    </>
  );
}