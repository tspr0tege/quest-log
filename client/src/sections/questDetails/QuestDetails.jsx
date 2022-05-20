import React, { useContext, useEffect } from 'react';

import { Context } from '../../App.jsx';

import EditableText from '../../components/EditableText.jsx';

import './QuestDetails.css';

export default ({ quest, questList }) => {
  // useEffect(() => {}, [quest])

  const { editQuest } = useContext(Context);
  
  if(quest !== null) {
    let { title, notes } = questList[quest];

    function handleFormSubmit(e) {
      const { value, dataset:{ questProp } } = e.target['form-field'];
      const editInfo = {quest_id: questList[quest].quest_id};
      editInfo[questProp] = value;
      console.log('Submitting form with: ' + JSON.stringify(editInfo));
      editQuest(editInfo);
    }

    return(
      <div>
        <div className='quest-focus-container'>
          {/* <h3>{title}</h3> */}
          <EditableText 
            content={title} 
            type='title' 
            handleFormSubmit={handleFormSubmit}
          />
          <div>
            <h3>Notes:</h3>
            {/* <p>{notes}</p> */}
            <EditableText 
              content={notes} 
              type='notes' 
              handleFormSubmit={handleFormSubmit}
            />
          </div>          
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
}