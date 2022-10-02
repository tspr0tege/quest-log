import React, { useEffect, useState } from 'react';

import GemButton from '@src/components/GemButton.jsx';

import './QuestDetails.css';

export default ({ quest, qIndex, editQuest, completeQuest }) => {

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
    completeQuest(qIndex);
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
                value={questData.notes[0]}
              /> 
            :
              <p>{questData.notes[0]}</p>
          }
          
        </div>
      </div>
      <div id="quest-details-controls">
        <GemButton 
          onClick={editing ? sendEdit : toggleEditing}
          disabled={quest === null}
          face={editing ? 'Save' : 'Edit'}
        />
        {!editing && <button disabled>Delete</button>}
        <GemButton 
          onClick={editing ? cancelEdit : complete}
          disabled={quest === null}
          face={editing ? 'Cancel' : 'Complete'}
        />        
      </div>
    </>
  );
}