import React from 'react';

// import QuestEdit from '../QuestEdit/QuestEdit.jsx';

import './QuestCreate.css'

export default ({handleClick}) => {
  
  //async function advance(e) {
    // e.preventDefault();
    // const newQuest = await handleClick(e);
    // sendToModal(<QuestEdit quest={newQuest}/>);      
  //}
  
  return (
    <form id="new-task-bar">
      <input type="text" name="title" placeholder="Enter a new task"/>
      <button id="create-btn" onClick={handleClick}>Create</button>
      {/* <button id="adv-create-btn" onClick={advance}>+Create</button> */}
    </form>
  );
}