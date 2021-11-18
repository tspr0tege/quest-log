import React from 'react';

import QuestList from './QuestList.jsx';

export default ({ quest }) => {

  function generateDisplay ([ key, value ]) {
    switch (key) {
      case 'title':
        return (
          <h3>Quest: {value}</h3>
        );
      case 'description':
        return (
          <>
            <h3>Description:</h3>
            <p>{value}</p>
          </>
        );
      case 'progress':
        return (
          <p>Progress: {value}%</p>
        );
      case 'subQuests':
        return (
          <>
            <h3>Sub-quests:</h3>
            <QuestList  quests={value} />
          </>
        );
      case 'parentQuest':
        let parent = (value) ? value : 'none';
        return (
          <p>Sub-quest of: {parent}</p>
        );
      case 'parentContribution':
        return (
          <p>Completing this quest will contribute {value} to its parent quest.</p>
        );
      default:
        key[0].toUpperCase();
        return <p>{key}: {value}</p>
    }
  }

  return (
    <>
      {Object.entries(quest).map((prop) => {
        return generateDisplay(prop)
      })}
      <p></p>
    </>
  );
}