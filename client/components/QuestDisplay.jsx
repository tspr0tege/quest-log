import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import QuestEdit from './QuestEdit.jsx';
import { Context } from './App.jsx';


export default ({ quest }) => {
  const { sendToModal, completeQuest } = useContext(Context);

  const edit = () => {
    sendToModal(<QuestEdit quest={quest}/>);
  }

  const complete = () => {
    completeQuest(quest);
  }

  return (
    <div className='quest-list-item'>
      <p> {quest.title} </p>
      <span onClick={complete}><FontAwesomeIcon icon={faCheck} /></span>
      <span onClick={edit}><FontAwesomeIcon icon={faEdit} /></span>
    </div>
  );
}