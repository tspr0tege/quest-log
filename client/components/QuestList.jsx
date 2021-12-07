import React from 'react';

import QuestDisplay from './QuestDisplay.jsx';

function nestedQuestList(questArray, depth = []) {
  return questArray.map((quest, index) => {
    let { subQuests } = quest;
    let newDepth = [...depth, index];

    return (
      <li key={newDepth.join('-')}>
        <QuestDisplay quest={quest} />
        {subQuests.length > 0 && <ul>{nestedQuestList(subQuests, newDepth)}</ul>}
      </li>
    );

  });
}

export default ({ quests }) => {

  return (
    <ul style={{overflowY: 'auto', maxHeight: '90%', margin: '0'}}>
      {nestedQuestList(quests)}
    </ul>
  );
}