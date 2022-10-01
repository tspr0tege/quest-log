import React, { useContext, useState } from 'react';
import { Context } from '../../App.jsx';

import GemButton from '../../components/GemButton.jsx';

import './QuestDetails.css';

export default ({ questIdx, questList }) => {

  const quest = (!!questIdx) ? questList[questIdx] : null;

  const { editQuest } = useContext(Context);
  const [ editing, setEditing ] = useState(false);
  
  function handleFormSubmit(e) {
    const { value, dataset:{ questProp } } = e.target['form-field'];
    const editInfo = {quest_id: quest.quest_id};
    editInfo[questProp] = value;
    console.log('Submitting form with: ' + JSON.stringify(editInfo));
    editQuest(editInfo);
  }

  function toggleEditing() {
    setEditing(!editing);
  }

  return(
    <>
      <div id="quest-details">
        <div className='quest-focus-container'>
          <h3>Quest:</h3>
          {quest !== null &&
            ((editing) ? 
              <input type='text'></input> 
            :
              <p>{quest.title}</p>
            )
          }
          
          <h3>Notes:</h3>
          {quest !== null &&
            ((editing) ? 
              <input type='text'></input> 
            :
              <p>{quest.notes}</p>
            )
          }
          
        </div>
      </div>
      <div id="quest-details-controls">
        <GemButton 
          onClick={toggleEditing}
          disabled={quest === null}
          face={editing ? 'Save' : 'Edit'}
        />
        <button disabled>Delete</button>
        <button disabled={quest === null}>Complete</button>
      </div>
    </>
  );
}