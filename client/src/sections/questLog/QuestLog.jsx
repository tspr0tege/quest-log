import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Quest from '@API/quests';

import QuestCreate from './QuestCreate.jsx';
import QuestList from '@src/components/QuestList/QuestList';
import QuestDetails from './QuestDetails.jsx';

import './QuestLog.css';

export default () => {
  const [ focusIndex, setFocusIndex ] = useState(null);
  const [ questList, setQuestList ] = useState(null);

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

  function completeQuest(index) {
    setFocusIndex(null);
    Quest.delete(questList[index].quest_id);
    const newList = [...questList];
    newList.splice(index, 1);
    setQuestList(newList);
  }

  function showDetails(e) {
    const { index } = e.target.closest('.quest-list-item').dataset;
    setFocusIndex(index);
  }

  return (
    <>
      <QuestCreate handleClick={createQuest}/>
      <div style={{gridRowEnd: 'span 2'}}>
        <QuestList 
          questList={questList}
          controls={
            <FontAwesomeIcon 
              icon={faArrowRight}
              onClick={showDetails}
            />
          }
        />
      </div>
      <QuestDetails 
        quest={focusIndex !== null ? questList[focusIndex] : null}
        qIndex={focusIndex}
        editQuest={editQuest} 
        completeQuest={completeQuest} />
    </>
  )
}

