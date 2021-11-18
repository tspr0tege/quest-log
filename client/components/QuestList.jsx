import React from 'react';

import QuestDisplay from './QuestDisplay.jsx';

export default ({ quests, edit }) => (
  <ul>
    {quests.map((quest, i) => {
      return (
        <li key={i}>
          <QuestDisplay text={quest.title} edit={edit} />
        </li>
      );
    })}
  </ul>
)