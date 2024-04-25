import React, { useState, createContext } from 'react';
import { Modal, Paper } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'fit-content',
  maxHeight: '85vh',
  overflowY: 'auto',
  padding: '20px'
};

export const ModalContext = createContext();

export default ({ children, resetTrigger = () => {} }) => {
  const [ showModal, setShowModal ] = useState(true);

  const modalControls = {
    open: () => {
      setShowModal(true)
    },
    close: () => {
      resetTrigger();
      setShowModal(false);
    }
  };
  
  return (
    <Modal
      open={showModal}
      onClose={modalControls.close}
    >
      <ModalContext.Provider
        value={{
          modalControls,
        }}      
      >
        <Paper sx={modalStyle}>

          {children}
        </Paper>
      </ModalContext.Provider>
    </Modal>
  )
}
