import React, { createContext, useState } from 'react';
import Modal from 'react-modal';

import DesktopDashboard from './dashboard/desktop/dashboard.jsx';

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
  const [ modalContent, setModalContent ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function showInModal(content) {
    setModalContent(content);
    toggleModal();
  }

  return (
    <Context.Provider value={{ showInModal }}>
      <Modal
        style={modalStyle}
        isOpen={showModal}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}>
          {modalContent}
      </Modal>
      <DesktopDashboard />
    </Context.Provider>
  )
}

export default App;
export { Context };
