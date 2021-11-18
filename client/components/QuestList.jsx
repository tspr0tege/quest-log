import React, { useContext } from 'react';

import QuestDisplay from './QuestDisplay.jsx';
// import { Context } from './App.jsx';

export default ({ quests }) => {
  // let { questList } = useContext(Context);
  
  return (
    <ul>
      {quests.map((quest, i) => {
        return (
          <li key={i}>
            <QuestDisplay quest={quest} />
          </li>
        );
      })}
    </ul>
  );
}