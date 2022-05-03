import React from 'react';

import QuestTile from '../QuestTile/QuestTile.jsx';

import './QuestList.css'

export default ({ quests, handleClick, completeQuest }) => {

  return (
    <ul>
      {quests.map((quest, i) => {
        return(
          <li key={i}>
            <QuestTile quest={quest} handleClick={handleClick} completeQuest={completeQuest}/>
          </li>
        );
      })}
    </ul>
  );
}