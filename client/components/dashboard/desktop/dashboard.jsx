import React, { useState, useEffect } from 'react';
import Quest from '../../../AJAX/Quests.js';
import QuestCreate from '../../quests/QuestCreate/QuestCreate.jsx';
import QuestList from '../../quests/QuestList/QuestList.jsx';
import QuestDetails from '../../quests/QuestDetails/QuestDetails.jsx';

import './dashboard.css';

export default () => {
  const [ questList, setQuestList ] = useState(null);
  const [ detailView, setDetailView ] = useState({});

  async function createQuest(e) {
    e.preventDefault();
    const { form } = e.target;
    let newQuest = await Quest.create({
      title: form.title.value
    });
    form.title.value = '';
    setQuestList([...questList, newQuest]);    
  }

  useEffect(async () => {
    if (questList === null) {
      const newList = [], getList = await Quest.get();
      for (let obj in getList) {
        newList.push(getList[obj]);
      }
      // console.log(newList);
      setQuestList(newList);
    }
  });

  function completeQuest(quest) {
    Quest.delete(quest.id);
    let newList = questList.slice().filter((q) => q.id != quest.id);
    setQuestList(newList);
  }

  function showDetails(quest) {
    setDetailView(quest);
  }

  return (
    <div id='dtop-dashboard'>
      <div id='hud'>
        <div>User Bar</div>
        <div>Navigation</div>
      </div>
      <div id='main-display'>
        <h2>Quest List</h2>
        <QuestCreate handleClick={createQuest}/>
        {questList && 
          <QuestList 
            handleClick={showDetails}
            completeQuest= {completeQuest}
            quests={questList}
          />}
      </div>
      <div id='detail-display'>
        <h2>Quest Details</h2>
        <QuestDetails quest={detailView}/>
      </div>
    </div>
  );
}