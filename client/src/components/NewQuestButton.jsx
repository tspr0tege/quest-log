import React, { useState, useRef, useContext } from 'react';
import { QuestContext } from '@src/components/QuestsData';
import Popup from '@src/components/Popup';

import './NewQuestButton.css';


export default () => {
  const buttonRef = useRef(null);
  const [ showNewTaskPopup, setShowNewTaskPopup ] = useState(false);
  const { controller } = useContext(QuestContext);

  function handleFormSubmit(e) {
    e.preventDefault();
    const submittedForm = new FormData(e.target);
    const formObject = Object.fromEntries(submittedForm);
    // console.log(formObject);
    controller.createQuest(formObject);
    e.target.reset();
  }

  return (
    <>
      <button
        id="new-task-button"
        ref={buttonRef}
        style={{
          color: 'white',
          backgroundColor: 'var(--brown1)',
          fontSize: '2em',
          fontWeight: 800,
          borderRadius: '50px',
          height: '2em',
          width: '2em',
          border: 'none',
          padding: 0
        }}
        onClick={() => setShowNewTaskPopup(!showNewTaskPopup)}
      >
        +
      </button>
      <Popup 
        id="new-task-popup"
        anchorRef={buttonRef} 
        isOpen={showNewTaskPopup} 
        onClose={() => setShowNewTaskPopup(false)}
      >
        <form 
          style={{minWidth: '30vw', padding: '20px'}}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text" 
            autoFocus
            required
            // fullWidth
            // margin="normal"
            id="title"
            name="title"
            style={{
              width: '100%',
              fontSize: '1.2em',
              padding: '.25em .5em',
            }}
            // label="Enter a new task" causing focus error and unable to type "e" in the field
          />
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--brown1)',
              color: 'white',
              padding: '.5em 1em',
              fontWeight: '600',
              fontSize: '1em',
              margin: '10px 0',
            }}
            // size="large"
            // variant="contained"
            // sx={{ mt: 3, mb: 2 }}
            // onClick={handleFormSubmit}
          >
            Add
          </button>
        </form>
      </Popup>
    </>
  );
}