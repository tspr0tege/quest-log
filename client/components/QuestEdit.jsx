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

  const { questList, editQuest } = useContext(Context);

  let skipList = chosenQuest.linearMapAll((quest) => {
    return quest;
  });
  // console.log(skipList);
  const fullList = questList.map((quest, index) => {
    return quest.linearMapAll((q, depth) => {
      let { title } = q;
      let key = depth.join('-');
        if(!skipList.includes(q)) {
          return <option value={key} key={key}>{title}</option>
        }
    }, [index]);
  });

  function updateParent (e) {
    // console.log(`changing parent quest to: ${questList[e.target.value]}`)
    let depth = e.target.value.split('-');
    let parent = questList[depth[0]];
    for (let i = 1; i < depth.length; i++) {
      parent = parent.subQuests[depth[i]];
    }
    editQuest(chosenQuest, { parent });
  }

  // console.log("Running list generation");

  return (
    <select 
    name="parent-quest" 
    id="parent-quest-dropdown" 
    onChange={updateParent}
    defaultValue={(parent) ? questList.indexOf(parent) : parent}>
      <option value={null}>None</option>
      {fullList}
    </select>
  );
}
