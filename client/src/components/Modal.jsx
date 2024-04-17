import React, { useEffect } from 'react';
import Modal from 'react-modal';

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

export default ({modalControls, showModal, children}) => {
  // const [ showModal, setShowModal ] = useState(false);

  // useEffect(() => {}, [showModal]);
  
  return (
    <Modal
      style={modalStyle}
      isOpen={showModal}
      onRequestClose={modalControls.close}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  )
}