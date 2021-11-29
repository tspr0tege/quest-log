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
    <ul style={{ flexGrow: 1 }}>
      {nestedQuestList(quests)}
    </ul>
  );
}