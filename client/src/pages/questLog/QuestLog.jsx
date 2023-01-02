import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Quest from '@API/quests';
import { Context } from '@src/App';

import QuestCreate from './QuestCreate.jsx';
import QuestList from '@src/components/QuestList/QuestList';
import QuestDetails from './QuestDetails.jsx';

import './QuestLog.css';

// Modal.setAppElement('#app');

export default () => {
  const [ focusIndex, setFocusIndex ] = useState(null);
  const [ questList, setQuestList ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const { user, modalStyle } = useContext(Context);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
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

    const updatedQuest = await Quest.edit(newInfo);
    newList[editingIndex] = updatedQuest;
    setQuestList(newList);
  }

  function completeQuest(index) {
    setFocusIndex(null);
    Quest.delete(questList[index].quest_id, user);
    const newList = [...questList];
    newList.splice(index, 1);
    setQuestList(newList);
  }

  function showDetails(e) {
    const { index } = e.target.closest('.quest-list-item').dataset;
    setFocusIndex(index);
    openModal();
  }

  return (
    <div id="quest-log">
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
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
      >
        <QuestDetails 
          quest={focusIndex !== null ? questList[focusIndex] : null}
          qIndex={focusIndex}
          editQuest={editQuest} 
          completeQuest={completeQuest} 
        />
      </Modal>
    </div>
  )
}

