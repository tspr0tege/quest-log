import React, { useContext, useState } from 'react';

// import QuestList from './QuestList.jsx';
import { Context } from './App.jsx';

import QuestEditForm from './QuestEditForm.jsx';

export default ({ quest }) => {
  const { editQuest, questList } = useContext(Context);
  // const [options, setOptions] = useState({
  //   title: quest.title,
  //   description: quest.description,
  //   parentQuest: quest.parentQuest,
  //   contribution: quest.contribution
  // });

  const processChanges = (e) => {
    e.preventDefault();
    const { title, description } = e.target.form;
    const options = { 
      title: title.value, 
      description: description.value
    };
    editQuest(quest, options);
  }

  const updateParent = (e) => {
    e.persist();
    let newParent;
    if (e.target.value === 'None') {
      newParent = null;
    } else {
      // traverses depth as a map, through children quests, to find new parent
      let depth = e.target.options[e.target.selectedIndex].dataset.depth.split('-');
      newParent = questList[depth[0]];
      for (let i = 1; i < depth.length; i++) {
        newParent = newParent.subQuests[depth[i]];
      }
    }
    setOptions({
      ...options,
      parentQuest: newParent
    });
  }

  return (
    <QuestEditForm quest={quest} submit={processChanges}/>
  );
}
