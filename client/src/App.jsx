import React, { createContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faListAlt as listIcon } from '@fortawesome/free-regular-svg-icons';
// import { 
//   faHouseUser as homeIcon, 
//   faBook as bookIcon, 
//   faArrowLeft as backIcon 
// } from '@fortawesome/free-solid-svg-icons';

import SectionWrapper from './components/SectionWrapper.jsx';
import QuestLog from './sections/questLog/QuestLog.jsx';

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

function checkWindow() {
  return window.innerWidth < 750;
}

// const screenWidth = window.screen.width * window.devicePixelRatio;

const App = () => {
  const c = document.cookie;
  const cookieObj = JSON.parse(c.substring(c.indexOf('{'), c.indexOf('}')+1));

  const [ modalContent, setModalContent ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ smolScreen, setSmolScreen ] = useState(checkWindow());

  function toggleModal() {
    setShowModal(!showModal);
  }

  function showInModal(content) {
    setModalContent(content);
    toggleModal();
  }
  
  useEffect(() => {
    const onResize = () => {
      if (checkWindow() !== smolScreen) {
        setSmolScreen(b => !b);
      }
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [smolScreen]);

  

  

  // function detailsBackBtn() {
  //   document.documentElement.style.setProperty('--mobile-columns-value', 'minmax(0, 1fr) 0px');
  // }

  return (
    <Context.Provider value={{ showInModal, smolScreen }}>
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}>
          {modalContent}
      </Modal>
      
      <div id='dashboard'>
        {/* <div id='hud'>
          <div className='user-profile'>
            <h3>User Profile</h3>
            <img src={cookieObj['photo_url']} alt="Profile picture" />
            <div className="profile-details">
              <p><span>Name:</span> {cookieObj.name}</p>
              <p><span>Level:</span> 39</p>
              <p><span>Next Level:</span></p>
            </div>
          </div>
        </div> */}
        <SectionWrapper 
          title="Quest Log" 
          id="quest-log"
        >
          <QuestLog />
        
        </SectionWrapper>

        {/* <SectionWrapper 
          title="Quest Details" 
          attrs={{
            id: "detail-display"
          }}
        >
          <QuestDetails quest={detailView} questList={questList}/>
        </SectionWrapper> */}
      </div>

    </Context.Provider>
  )
}

export default App;
export { Context };
