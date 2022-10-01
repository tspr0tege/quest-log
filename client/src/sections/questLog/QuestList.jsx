import React from 'react';

import QuestListItem from './QuestListItem.jsx';

import './QuestList.css'

export default ({ quests, handleClick, completeQuest }) => {

  return (
    <ul className="quest-list">
      {quests.map((quest, i) => {
        return(
          <li key={i}>
            <QuestListItem quest={quest} handleClick={handleClick} />
          </li>
        );
      })}
    </ul>
  );
}