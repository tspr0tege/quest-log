import React, { useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { QuestContext } from '@src/components/QuestsData';
import { ModalContext } from '@src/components/Modal';

export default ({ targetIndex }) => {
  const { modalControls } = useContext(ModalContext);
  const { questList, controller } = useContext(QuestContext);

  const questInEdit = questList[targetIndex];

  function processEdit(e) {
    e.preventDefault();
    const { title, notes } = e.target;
    const dataToSubmit = {
      quest_id: questInEdit.quest_id,
      title: title.value,
      notes: notes.value,
    };

    controller.editQuest(targetIndex, dataToSubmit);
    modalControls.close();
  }
  
  return (
    <Box component="form" onSubmit={processEdit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        name="title"
        label="Title"
        // autoComplete="email"
        defaultValue={questInEdit.title}
      />
      <TextField
        margin="normal"
        fullWidth
        multiline
        id="notes"
        name="notes"
        label="Details"
        // autoComplete="email"
        defaultValue={questInEdit.notes}
      />
      <Box sx={{display: 'flex', justifyContent: 'space-around', mt: '20px'}}>
        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Submit
        </Button>
        <Button
          // type="submit"
          onClick={modalControls.close}
          variant="outlined"
          size="large"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}