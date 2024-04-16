import React from 'react';

import './QuestListItem.css';

export default ({ quest, qId, controls }) => {

  return (
    <div className='quest-list-item' data-questid={qId}>
      {/* <div> */}
        <h3>{quest.title}</h3>
      {/* </div> */}
      <div className='quest-controls'>
        {controls}
      </div>
    </div>
  );
}