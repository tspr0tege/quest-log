import React, { createContext, useState, useEffect } from 'react';
import Modal from 'react-modal';

// import Nav from '@src/components/nav/Nav.jsx';
import ProfileSidebar from '@src/components/ProfileSidebar.jsx';
import CreateProfile from '@src/components/CreateProfile.jsx';
import QuestLog from '@src/pages/questLog/QuestLog.jsx';

import Profile from '@API/profile';

Modal.setAppElement('#app');
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
    maxHeight: '85vh',
    overflowY: 'auto',
    backgroundColor: 'var(--brown)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

const Context = createContext();

export default ({ user }) => {
  const [ userProfile, setUserProfile ] = useState(null);  
  const [ showModal, setShowModal ] = useState(false);
  function openModal() {setShowModal(true);}
  function closeModal() {setShowModal(false);}
  user = user.sub.split('|')[1] || '';

  useEffect(async () => {
    if (userProfile === null && !showModal) {
      const profileInfo = await Profile.get(user);
      if(!!profileInfo) {
        // console.log(profileInfo);
        setUserProfile(profileInfo)
      } else {
        console.error('profileInfo is null. No user found in the database for ' + user);
        // Execute user creation in Modal
        openModal();
      }
    }
  });

  function updateProfile(update) {
    // TODO: check for update to level and execute animation
    setUserProfile({...userProfile, ...update});
  }

  return (
    <Context.Provider 
      value={{ 
        user, 
        modalStyle
      }}
    >
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
      >
        <CreateProfile close={closeModal}/>
      </Modal>
      <div id="main-app">
        <ProfileSidebar userProfile={userProfile}/>
        <QuestLog updateProfile={updateProfile} />
      </div>
    </Context.Provider>
  )
}

export { Context };
