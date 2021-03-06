import React, { useState, useEffect } from 'react';
import Quest from '../API/quests.js';
import QuestCreate from './sections/questList/QuestCreate.jsx';
import QuestList from './sections/questList/QuestList.jsx';
import QuestDetails from './sections/questDetails/QuestDetails.jsx';

import './Dashboard.css';

export default () => {
  const c = document.cookie;
  const cookieObj = JSON.parse(c.substring(c.indexOf('{'), c.indexOf('}')+1));
  
  const [ questList, setQuestList ] = useState(null);
  const [ detailView, setDetailView ] = useState({});

  async function createQuest(e) {
    e.preventDefault();
    const { form } = e.target;
    let newQuest = await Quest.create({
      title: form.title.value
    });
    console.log(newQuest)
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
    Quest.delete(quest.quest_id);
    let newList = questList.slice().filter((q) => q.quest_id != quest.quest_id);
    setQuestList(newList);
  }

  function showDetails(quest) {
    setDetailView(quest);
  }

  return (
    <div id='dtop-dashboard'>
      <div id='hud'>
        <div className='user-profile'>
          <h3>User Profile</h3>
          <img src={cookieObj['photo_url']} alt="Profile picture" />
          <div className="profile-details">
            <p><span>Name:</span> {cookieObj.name}</p>
            <p><span>Level:</span> 39</p>
            <p><span>Next Level:</span></p>
          </div>
        </div>
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