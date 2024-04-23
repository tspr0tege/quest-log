import React, { useContext } from 'react';
import {} from '@mui/material';

import { QuestContext } from '@src/components/QuestsData';
import { ModalContext } from '@src/components/Modal';

export default ({ targetIndex, setTargetIndex }) => {
  const { modalControls } = useContext(ModalContext);
  
  return (
    <p> TEST {targetIndex}
      {/* 
      MODAL
      QUESTDATA CONTEXT
      FORM
      -TITLE
      -DESCRIPTION
      -PARENT/CHILD
      SUBMIT/CANCEL
      */}
    </p>
  );
}