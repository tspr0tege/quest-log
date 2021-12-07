import React from 'react';

import QuestList from './QuestList.jsx';
import ProgressBar from './ProgressBar.jsx';

export default ({ quest }) => {
  let active = Object.keys(quest).length > 0;
  if(active) {
    let { title, description, progress, subQuests, parentQuest, contribution } = quest;

    return(
      <div>
        <div className='quest-focus-container'>
          <h3><span>Quest:</span> {title}</h3>
          <div>
            <h3>Description:</h3>
            <p>{description}</p>
          </div>
          <div>
            <h3>Progress: </h3>
            <ProgressBar progress={progress} customStyles={{height: '20px'}}/>
          </div>
          <div id='quest-focus-sub-quests'>
            <h3>Sub-quests:</h3>
            <QuestList quests={subQuests} />
          </div>
          <div>
            <h3>Parent Quest Line:</h3>
            <p>{(parentQuest) ? parentQuest.title : 'None'}</p>
          </div>
          <div>
            <h3>Completion value to Quest Line:</h3>
            <p>{contribution}%</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
}