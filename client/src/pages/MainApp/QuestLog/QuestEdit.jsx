import React, { useContext } from 'react';

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
    <form onSubmit={processEdit}>
      <input
        type="text"
        margin="normal"
        required
        fullWidth
        id="title"
        name="title"
        label="Title"
        // autoComplete="email"
        defaultValue={questInEdit.title}
      />
      <input
        type='text'
        margin="normal"
        fullWidth
        multiline
        id="notes"
        name="notes"
        label="Details"
        style={{
          width: '100%',
          fontSize: '1.2em',
          padding: '.25em .5em',
        }}
        // autoComplete="email"
        defaultValue={questInEdit.notes}
      />
      <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
        <button
          type="submit"
          variant="contained"
          size="large"
          style={{
            backgroundColor: 'var(--brown1)',
            color: 'white',
            padding: '.5em 1em',
            fontWeight: '600',
            fontSize: '1em',
            margin: '10px 0',
          }}
        >
          Submit
        </button>
        <button
          // type="submit"
          onClick={modalControls.close}
          variant="outlined"
          size="large"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}