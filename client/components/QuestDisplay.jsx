import React, { useContext } from 'react';

import QuestEdit from './QuestEdit.jsx';
import { Context } from './App.jsx';


export default ({ quest }) => {
  const { sendToModal } = useContext(Context);

  const handleClick = () => {
    sendToModal(<QuestEdit quest={quest}/>);
  }

  return (
    <p onClick={handleClick}>{quest.title}</p>
  );
}