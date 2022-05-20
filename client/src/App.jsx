import React, { createContext, useState, useEffect } from 'react';
import Modal from 'react-modal';

import Quest from '../API/quests.js';

import QuestCreate from './sections/questList/QuestCreate.jsx';
import QuestList from './sections/questList/QuestList.jsx';
import QuestDetails from './sections/questDetails/QuestDetails.jsx';

import './App.css';

Modal.setAppElement('#app');
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
    maxHeight: '85vh',
    overflowY: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

const Context = createContext();

// const screenWidth = window.screen.width * window.devicePixelRatio;

const App = () => {
  const c = document.cookie;
  const cookieObj = JSON.parse(c.substring(c.indexOf('{'), c.indexOf('}')+1));

  const [ modalContent, setModalContent ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ questList, setQuestList ] = useState(null);
  const [ detailView, setDetailView ] = useState(null);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function showInModal(content) {
    setModalContent(content);
    toggleModal();
  }
  
  // Retrieve questlist on first load
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
    console.log(newQuest)
    form.title.value = '';
    setQuestList([...questList, newQuest]);
  }

  async function editQuest(newInfo) {
    const newList = [...questList];
    const editingIndex = newList.findIndex(q => q.quest_id === newInfo.quest_id);

    const updatedQuest = await Quest.edit(newInfo);
    // console.log(updatedQuest);
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
    console.log(focusIndex)
    setDetailView(focusIndex);
  }

  return (
    <Context.Provider value={{ showInModal, editQuest }}>
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}>
          {modalContent}
      </Modal>
      
      <div id='dashboard'>
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
          <QuestDetails quest={detailView} questList={questList}/>
        </div>
      </div>

    </Context.Provider>
  )
}

export default App;
export { Context };
