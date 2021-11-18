import React, { useContext } from 'react';
// import Quest from '../Quest.js';

import QuestEdit from './QuestEdit.jsx';
import { SendToModal } from './App.jsx';


export default ({ quest }) => {
  const edit = useContext(SendToModal);

  const handleClick = () => {
    edit(<QuestEdit quest={quest}/>);
  }

  return (
    <p onClick={handleClick}>{quest.title}</p>
  );
}