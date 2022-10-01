import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-regular-svg-icons';

// import QuestEdit from '../QuestEdit/QuestEdit.jsx';
// import ProgressBar from '../../progressbar/ProgressBar.jsx';
// import { Context } from '../../App.jsx';

import './QuestListItem.css';

export default ({ quest, handleClick=()=>{} }) => {
  // const { sendToModal, completeQuest, sendToFocus } = useContext(Context);

  return (
    <div className='quest-list-item'>
      <div 
      onClick={() => {}} 
      style={{flexGrow: 1, maxWidth: 'calc(100% - 75px)'}}>
        <h3>{quest.title}</h3>
      </div>
      <div className='quest-controls'>
        <FontAwesomeIcon 
          icon={faArrowRight}
          onClick={() => {handleClick(quest)}}         
        />
      </div>
    </div>
  );
}