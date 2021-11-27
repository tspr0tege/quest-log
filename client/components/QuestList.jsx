import React from 'react';

import QuestDisplay from './QuestDisplay.jsx';

function nestedQuestList(questArray, depth) {
  depth = depth || [];
  return questArray.map((quest, index) => {    
      return (
        <li key={([...depth, index]).join('-')}>
          <QuestDisplay quest={quest} />
          <InnerUl questList={quest.subQuests} depth={[...depth, index]} />
        </li>
      );    
  });
}

const InnerUl = ({ questList, depth }) => {
  if (questList.length > 0) {
    return <ul>{nestedQuestList(questList, depth)}</ul>
  }
  return null;
}

export default ({ quests }) => {  

  let width = '50%';

  return (
    <ul style={{ width }}>
      {nestedQuestList(quests)}
    </ul>
  );
}