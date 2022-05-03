import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-regular-svg-icons';

// import QuestEdit from '../QuestEdit/QuestEdit.jsx';
import ProgressBar from '../../progressbar/ProgressBar.jsx';
// import { Context } from '../../App.jsx';

import './QuestTile.css';

export default ({ quest, handleClick=()=>{}, completeQuest }) => {
  // const { sendToModal, completeQuest, sendToFocus } = useContext(Context);

  return (
    <div className='quest-list-item'>
      <div 
      onClick={() => {handleClick(quest)}} 
      style={{flexGrow: 1, maxWidth: 'calc(100% - 75px)'}}>
        <h3>{quest.title} </h3>       
        {/* <ProgressBar progress={quest.progress} /> */}
      </div>
      <div className='quest-controls'>
        <FontAwesomeIcon
        icon={faCheck}
        onClick={() => {completeQuest(quest)}} 
        />
      </div>
    </div>
  );
}