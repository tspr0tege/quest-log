import React from 'react';

import QuestDisplay from './QuestDisplay.jsx';

export default ({ quests }) => {
  
  return (
    <ul>
      {quests.map((quest, i) => {
        return quest.mapAll((q, k) => {
          return (
            <li key={k}>
              <QuestDisplay quest={q} />
            </li>
          );
        });
      })}
    </ul>
  );
}