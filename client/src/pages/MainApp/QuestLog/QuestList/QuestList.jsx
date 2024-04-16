import React from 'react';

import QuestListItem from './QuestListItem/QuestListItem';

import './QuestList.css'

export default ({ controls, questList, nested=false }) => {

  const [ questTree, setQuestTree ] = React.useState([]);
  
  function searchInsert(list, insert) {
    for (let quest of list) {
      // console.log(quest);
      if (quest.quest_id == insert.parent_id) {
        quest.children.push(insert);
        return true;
      }
      if (quest.children.length > 0) {
        if (searchInsert(quest.children, insert)) {
          return true;
        }
      }
    }
  }
  
  React.useEffect(() => {  
    if (nested) {
      const unsorted = [].concat(questList); // make a local copy of questList
      for (let quest of unsorted) {
        quest.children = [];
      }

      let i = 0;
      while(unsorted[i] !== undefined) {
        let quest = unsorted[i];
        if (!quest.parent_id) { // skip quests with no parent
          i++;
        } else {
          quest = unsorted.splice(i, 1)[0]; // remove from array
          if (!searchInsert(unsorted, quest)) { // if it cant be placed on another quest
            unsorted.unshift(quest);  // Place back at the front and move on
            i++;
          }
        }
      }
      // Unsorted is sorted, apply to state
      setQuestTree(unsorted);
      console.log(unsorted);
    }
  }, [questList]);

  if (nested) {
    return (
      <>
      </>
    );
  } else {
    return (
      <ul className="quest-list">
        {questList?.map((quest, i) => {
          return(
            <li key={i}>
              <QuestListItem quest={quest} qId={quest.quest_id} controls={controls} />
            </li>
          );
        })}
      </ul>
    );
  }
}
