import React, { useState, useEffect } from 'react';
import Quest from '../../../API/quests';

import QuestCreate from './QuestCreate.jsx';
import QuestList from './QuestList.jsx';
import QuestDetails from './QuestDetails.jsx';

import './QuestLog.css';

export default () => {
  const [ questList, setQuestList ] = useState(null);
  const [ detailView, setDetailView ] = useState(null);

  useEffect(async () => {
    if (questList === null) {
      const newList = [], getList = await Quest.get();
      for (let obj in getList) {
        newList.push(getList[obj]);
      }
      setQuestList(newList);
    }
  });

  async function createQuest(e) {
    e.preventDefault();
    const { form } = e.target;
    let newQuest = await Quest.create({
      title: form.title.value
    });
    form.title.value = '';
    setQuestList([...questList, newQuest]);
  }

  async function editQuest(newInfo) {
    const newList = [...questList];
    const editingIndex = newList.findIndex(q => q.quest_id === newInfo.quest_id);

    const updatedQuest = await Quest.edit(newInfo);
    newList[editingIndex] = updatedQuest;
    setQuestList(newList);    
  }

  function completeQuest(quest) {
    if (questList.indexOf(quest) === detailView) {
      setDetailView(null);
    }
    Quest.delete(quest.quest_id);
    let newList = questList.slice().filter((q) => q.quest_id != quest.quest_id);
    setQuestList(newList);
  }

  function showDetails(quest) {
    const focusIndex = questList.findIndex(q => q.quest_id === quest.quest_id);
    // console.log(focusIndex)
    setDetailView(focusIndex);
    // if (smolScreen) {
    //   document.documentElement.style.setProperty('--mobile-columns-value', '0px minmax(0, 1fr)');
    // }
  }

  return (
    <>
      <QuestCreate handleClick={createQuest}/>
      <div style={{gridRowEnd: 'span 2'}}>
        {questList && 
          <QuestList 
            handleClick={showDetails}
            completeQuest= {completeQuest}
            quests={questList}
          />
        }
      </div>
      <QuestDetails questIdx={detailView} questList={questList}/>
    </>
  )
}

