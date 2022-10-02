import React from 'react';

import QuestListItem from './QuestListItem.jsx';

import './QuestList.css'

export default ({ controls, questList }) => {

  return (
    <ul className="quest-list">
      {questList?.map((quest, i) => {
        return(
          <li key={i}>
            <QuestListItem quest={quest} qIndex={i} controls={controls} />
          </li>
        );
      })}
    </ul>
  );
}