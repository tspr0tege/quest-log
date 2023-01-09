import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-modal';

import Profile from '@API/profile';
import { Context } from '@src/App';

import CreateProfile from './CreateProfile';

import './ProfileSidebar.css';

export default () => {
  const { user, modalStyle } = useContext(Context);
  const [ showModal, setShowModal ] = useState(false);
  const [ userProfile, setUserProfile ] = useState(null);

  function openModal() {setShowModal(true);}
  function closeModal() {setShowModal(false);}

  useEffect(async () => {
    if (userProfile === null && !showModal) {
      const profileInfo = await Profile.get(user);
      if(!!profileInfo) {
        // console.log(profileInfo);
        setUserProfile(profileInfo)
      } else {
        console.error('profileInfo is null. No user found in the database');
        // Execute user creation in Modal
        openModal();
      }
    }
  });

  return (
    <div id="profile-sidebar">
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
      >
        <CreateProfile close={closeModal}/>
      </Modal>

      {!!userProfile &&
        <>
          <h3>Name</h3>
          <p>{userProfile.name}</p>
          <h3>Image</h3>
          <img src={userProfile.photo_url} alt="Profile Picture" />
          <h3>Level</h3>
          <p>{userProfile.level}</p>
          <h3>Next Level</h3>
          <p>{userProfile.exp} / {Math.floor(100 * Math.pow(1.1, userProfile.level - 1))}</p>
        </>
      }
    </div>
  );
}