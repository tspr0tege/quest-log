import React from 'react';

import QuestEdit from './QuestEdit.jsx';

export default ({ handleClick, sendToModal}) => {
  
  async function advance(e) {
    e.preventDefault();
    const newQuestlist = await handleClick(e);
    sendToModal(<QuestEdit quest={newQuestlist[newQuestlist.length-1]}/>);      
  }
  
  return (
    <form>
      <input type="text" name="text" placeholder="Enter a new task"/>
      <button onClick={handleClick}>Create</button>
      <button onClick={advance}>+Create</button>
    </form>
  );
}