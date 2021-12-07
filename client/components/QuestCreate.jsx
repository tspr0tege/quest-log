import React from 'react';

import QuestEdit from './QuestEdit.jsx';

export default ({ handleClick, sendToModal}) => {
  
  async function advance(e) {
    e.preventDefault();
    const newQuestlist = await handleClick(e);
    sendToModal(<QuestEdit quest={newQuestlist[newQuestlist.length-1]}/>);      
  }
  
  return (
    <form id="new-task-bar">
      <input type="text" name="text" placeholder="Enter a new task"/>
      <button id="create-btn" onClick={handleClick}>Create</button>
      <button id="adv-create-btn" onClick={advance}>+Create</button>
    </form>
  );
}