import React from 'react';

import QuestDisplay from './QuestDisplay.jsx';

export default ({ quests }) => (
  <ul>
    {quests.map((quest, i) => {
      return (
        <li key={i}>
          <QuestDisplay quest={quest} />
        </li>
      );
    })}
  </ul>
)