import React from 'react';

import QuestList from './QuestList.jsx';

export default ({ quest }) => {
  let active = Object.keys(quest).length > 0;
  if(active) {
    let { title, description, progress, subQuests, parentQuest, contribution } = quest;
    return(
      <div>
        <h3>Title: {title}</h3>
        <div>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
        <p>Progress: {progress}%</p>
        <div>
          <h3>Sub-quests:</h3>
          <QuestList quests={subQuests} />
        </div>
        <p>Parent Quest Line: {(parentQuest) ? parentQuest.title : 'None'}</p>
        <p>Completion value to Quest Line: {contribution}</p>
      </div>
    );
  } else {
    return <div></div>
  }
}