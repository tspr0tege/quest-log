import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import QuestEdit from './QuestEdit.jsx';
import ProgressBar from './ProgressBar.jsx';
import { Context } from './App.jsx';


export default ({ quest }) => {
  const { sendToModal, completeQuest, sendToFocus } = useContext(Context);

  return (
    <div className='quest-list-item'>
      <div 
      onClick={() => {sendToFocus(quest)}} 
      style={{flexGrow: 1, maxWidth: 'calc(100% - 75px)'}}>
        <h3>{quest.title} </h3>       
        {/* <ProgressBar progress={quest.progress} /> */}
      </div>
      <div className='quest-controls'>
        <FontAwesomeIcon
        icon={faEdit}
        onClick={() => {sendToModal(<QuestEdit quest={quest}/>)}} />  

        <FontAwesomeIcon
        icon={faCheck}
        onClick={() => {completeQuest(quest)}} />
      </div>
    </div>
  );
}