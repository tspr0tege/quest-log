import React, { useEffect, useState } from 'react';

import Button from '@src/components/Button.jsx';

import './QuestDetails.css';

const deleteWarning = 'This will permanently delete this quest from the database. Are you sure?';

export default ({ quest, qIndex, editQuest, completeQuest, deleteQuest }) => {
  const questData = {};

  const [ editing, setEditing ] = useState(false);
  questData.title = useState();
  questData.notes = useState();

  useEffect(() => {
    if (quest !== null) {
      questData.title[1](quest.title);
      questData.notes[1](quest.notes);
    } else {
      questData.title[1](null);
      questData.notes[1](null);
    }
  }, [quest]);
  
  function handleChange(e, prop) {
    questData[prop][1](e.target.value);
  }  
  
  function toggleEditing() {
    setEditing(!editing);
  }
  
  function cancelEdit() {
    for(let key in questData) {
      questData[key][1](quest[key]);
    }
    toggleEditing();
  }
  
  function sendEdit() {
    const editInfo = {
      quest_id: quest.quest_id,
      title: questData.title[0],
      notes: questData.notes[0],
    };
    editQuest(editInfo);
    toggleEditing();
  }
  
  function complete() {
    completeQuest(null, qIndex);
  }

  function handleDelete() {    
    if(confirm(deleteWarning)) {
      deleteQuest(qIndex);
    }
  }

  return(
    <>
      <div id="quest-details">
        <div className='quest-focus-container'>
          <h3>Quest:</h3>
          {(editing) ? 
              <input 
                type='text'
                value={questData.title[0]}
                onChange={(e) => handleChange(e, 'title')}
              />
            :
              <p>{questData.title[0]}</p>
           }
          
          <h3>Notes:</h3>
          {(editing) ? 
              <textarea
                onChange={(e) => handleChange(e, 'notes')}
                value={questData.notes[0] || ""}
              /> 
            :
              <p>{questData.notes[0]}</p>
          }

          <h3>Progress:</h3>
          <p></p>

          <h3>Due by:</h3>
          <p></p>

          <h3>Assigned to Quest:</h3>
          <p>Parent or List</p>

        </div>
      </div>
      <div id="quest-details-controls">
        <Button 
          onClick={editing ? sendEdit : toggleEditing}
          disabled={quest === null}
        >
          {editing ? 'Save' : 'Edit'}
        </Button>
        {!editing && <button onClick={handleDelete}>Delete</button>}
        <Button 
          onClick={editing ? cancelEdit : complete}
          disabled={quest === null}
        >
          {editing ? 'Cancel' : 'Complete'}
        </Button>        
      </div>
    </>
  );
}