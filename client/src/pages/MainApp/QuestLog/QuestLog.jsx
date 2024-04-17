import React, { useState, useEffect, useContext } from 'react';
// import Modal from 'react-modal';

import InspectIcon from '@src/icons/right-to-bracket-solid.svg';
import CompleteIcon from '@src/icons/square-check-regular.svg';

import Quest from '@API/quests';
import { UserContext } from '@src/App';

import QuestCreate from './QuestCreate/QuestCreate';
import QuestList from './QuestList/QuestList';
import QuestDetails from './QuestDetails/QuestDetails';
import Modal from '@src/components/modal/Modal';

import './QuestLog.css';

export default ({ updateProfile }) => {
  const { userProfile: { profile_id: user }} = useContext(UserContext);
  const [ focusIndex, setFocusIndex ] = useState(null);
  const [ questList, setQuestList ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  const modalControls = {
    open: () => {setShowModal(true)},
    close: () => {setShowModal(false)}
  }

  useEffect(async () => {
    if (questList === null) {
      const newList = [], getList = await Quest.get(null, user);
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
    }, user);
    form.title.value = '';
    setQuestList([...questList, newQuest]);
  }

  async function editQuest(newInfo) {
    const newList = [...questList];
    const editingIndex = newList.findIndex(q => q.quest_id === newInfo.quest_id);
    for (const [key, value] of Object.entries(newInfo)) {
      if (key !== 'quest_id' && questList[editingIndex][key] === value) {
        delete newInfo[key];
      }
    }

    const updatedQuestList = await Quest.edit(newInfo);
    // Changing parent will affect more than one quest
    // so response object is an array
    updatedQuestList.forEach((quest) => {
      let index = newList.find((q) => q.title == quest.title);
      newList[index] = quest;
    });

    setQuestList(newList);
    modalControls.close();
  }

  // IMPORTANT: delete needs to check for children 
  // and cancel operation or delete everything
  async function deleteQuest(index) {
    const { quest_id } = questList[index];
    Quest.delete(quest_id);
    setFocusIndex(null);
    modalControls.close();
    removeFromQuestlist(index);
  }

  async function completeQuest(e, index) {
    if (!index) {
      const { questid } = e.target.closest('.quest-list-item').dataset;
      const targetQuest = questList.find((q) => q.quest_id === questid);
      index = questList.indexOf(targetQuest);
    }
    
    const response = await Quest.complete(questList[index].quest_id, user);

    // response object will contain profile fields that have been updated
    if (!!response?.exp) {
      removeFromQuestlist(index);
      updateProfile(response);
      setFocusIndex(null);
      modalControls.close();      
    }    
  }

  function removeFromQuestlist(index) {
    const newList = [...questList];
    newList.splice(index, 1);
    setQuestList(newList);
  }

  function showDetails(e) {
    const { questid } = e.target.closest('.quest-list-item').dataset;
    const targetQuest = questList.find((q) => q.quest_id === questid);
    setFocusIndex(questList.indexOf(targetQuest));
    modalControls.open();
  }

  return (
    <div id="quest-log">
      <QuestCreate handleClick={createQuest}/>
      <div style={{gridRowEnd: 'span 2'}}>
        {questList && <QuestList 
          questList={questList}
          controls={<CompleteIcon onClick={completeQuest}/>}
        />}
      </div>
    </div>
  )
}

