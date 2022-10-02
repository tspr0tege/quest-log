import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useState } from 'react';
import Modal from 'react-modal';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faListAlt as listIcon } from '@fortawesome/free-regular-svg-icons';
// import { faHouseUser, faBook, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import SectionWrapper from './components/SectionWrapper.jsx';
import QuestLog from './sections/questLog/QuestLog.jsx';
import LoginBtn from './components/LoginBtn.jsx';
import LogoutBtn from './components/LogoutBtn.jsx';

import './App.css';
import Nav from './sections/nav/Nav.jsx';

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

// const checkWindow = () => window.innerWidth < 750;
// const screenWidth = window.screen.width * window.devicePixelRatio;

const App = () => {
  
  /* useEffect(() => {
    const onResize = () => { if (checkWindow() !== smolScreen) {setSmolScreen(b => !b);} }
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize) }
  }, [smolScreen]); */

  return (
    <Auth0Provider
    domain="dev-6-2fm190.us.auth0.com"
    clientId="oyTxYOApnYlqIYSgDsOGbmdom0LvQ0Bo"
    redirectUri={window.location.origin}>
      <MainApp />
    </Auth0Provider>
  )
}

const MainApp = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ modalContent, setModalContent ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  // const [ smolScreen, setSmolScreen ] = useState(checkWindow());

  function toggleModal() {
    setShowModal(!showModal);
  }

  function showInModal(content) {
    setModalContent(content);
    toggleModal();
  }

  if (isLoading) return <p>Loading...</p>
  
  return (
    <Context.Provider value={{ showInModal }}>
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}>
          {modalContent}
      </Modal>
      <Nav />

      {isAuthenticated && (
        <SectionWrapper title="Quest Log" id="quest-log">
          <QuestLog />
        </SectionWrapper>
      )}
    </Context.Provider>
  )

}

export default App;
export { Context };
