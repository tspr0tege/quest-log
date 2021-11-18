import React, { useContext } from 'react';

import QuestList from './QuestList.jsx';
import { Context } from './App.jsx';

export default ({ quest }) => {

  let { 
    title, 
    description, 
    progress, 
    subQuests, 
    parentQuest, 
    parentContribution } = quest;

  return (
    <>    
      <h3>Quest: {title}</h3>
      <h3>Description:</h3>
      <p>{description}</p>
      <p>Progress: {progress}%</p>
      <h3>Sub-quests:</h3>
      <QuestList  quests={subQuests} />
      <p>Sub-quest of: {dropList(parentQuest, quest)}</p>
      <p>Completing this quest will contribute {parentContribution} to its parent quest.</p>      
    </>
  );
}

const dropList = (parent, chosenQuest) => {

  const { questList } = useContext(Context);

  function updateParent (e) {
    console.log(`changing quest to: ${questList[e.target.value]}`)
    chosenQuest.parentQuest = questList[e.target.value];
    chosenQuest.parentQuest.subQuests.push(chosenQuest);
    let removeIndex = questList.indexOf(chosenQuest)
    questList.splice(removeIndex, 1)
  }

  console.log("Running list generation");

  return (
    <select 
    name="parent-quest" 
    id="parent-quest-dropdown" 
    onChange={updateParent}
    defaultValue={(parent) ? questList.indexOf(parent) : parent}>
      <option value={null}>None</option>
      {questList.map( (quest, index) => {
        let { title } = quest;
        switch (title) {
          case chosenQuest.title:
            return <option value={index} key={title} disabled>{title}</option>
          default:
            return <option value={index} key={title}>{title}</option>
        }
      })}
    </select>
  );
}
