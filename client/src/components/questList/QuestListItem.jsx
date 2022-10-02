import React from 'react';

import './QuestListItem.css';

export default ({ quest, qIndex, controls }) => {

  return (
    <div className='quest-list-item' data-index={qIndex}>
      <div 
      onClick={() => {}} 
      style={{flexGrow: 1, maxWidth: 'calc(100% - 75px)'}}>
        <h3>{quest.title}</h3>
      </div>
      <div className='quest-controls'>
        {controls}
      </div>
    </div>
  );
}