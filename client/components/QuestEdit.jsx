import React, { useContext, useState } from 'react';

import QuestList from './QuestList.jsx';
import { Context } from './App.jsx';

export default ({ quest }) => {
  const { editQuest, questList } = useContext(Context);
  const [options, setOptions] = useState({
    title: quest.title,
    description: quest.description,
    parentQuest: quest.parentQuest,
    contribution: quest.contribution
  });

  const submit = (e) => {
    e.preventDefault();
    editQuest(quest, options);
  }

  const updateTitle = (e) => {
    e.persist();
    setOptions({
      ...options,
      title: e.target.value
    });
  }

  const updateDescription = (e) => {
    e.persist();
    setOptions({
      ...options,
      description: e.target.value
    });
  }

  const updateParent = (e) => {
    e.persist();
    let newParent;
    if (e.target.value === 'None') {
      newParent = null;
    } else {
      // traverses depth as a map, through children quests, to find new parent
      let depth = e.target.options[e.target.selectedIndex].dataset.depth.split('-');
      newParent = questList[depth[0]];
      for (let i = 1; i < depth.length; i++) {
        newParent = newParent.subQuests[depth[i]];
      }
    }
    setOptions({
      ...options,
      parentQuest: newParent
    });
  }

  const updateContribution = (e) => {
    e.persist();
    setOptions({
      ...options,
      contribution: parseInt(e.target.value)
    });
  }

  return (
    <form id='quest-edit-form'>
      <div>
        <h3>Title:</h3>
        <input 
          type='text' 
          value={options.title} 
          onChange={updateTitle}>          
        </input>
      </div>
      <div>
        <h3>Description:</h3>
        <textarea 
          value={options.description} 
          onChange={updateDescription} 
          placeholder='Enter a description...' 
          rows='5' 
          style={{width: '95%'}}>
        </textarea>
      </div>
      <div>
        <h3>Progress:</h3>
        <p>{quest.progress}%</p>
      </div>
      <div>
        <h3>Sub-quests:</h3>
        <QuestList  quests={quest.subQuests} />
      </div>
      <div>
        <h3>Parent Quest Line:</h3>
        <select
          id="parent-quest-dropdown" 
          onChange={updateParent}
          defaultValue={(options.parentQuest) ? options.parentQuest.id : null}>

          <option value={null}>None</option>
          {dropList(quest)}
        </select>
      </div>
      {options.parentQuest && <div>
        <h3>Contribution to Quest Line:</h3>
        <div style={{display: 'flex'}}>
          <input 
            type='range' 
            min='0' max='100' step='1' 
            value={options.contribution} 
            onChange={updateContribution}/>

          <input 
            type='number' 
            min='0' max='100' 
            value={options.contribution} 
            onChange={updateContribution}/>

        </div>
      </div>}
      <button onClick={submit} style={{marginTop: '20px'}}>Submit Changes</button>
    </form>
  );
}

const dropList = (targetQuest) => {
  const { questList } = useContext(Context);

  // List of quests (self and children) that would be invalid parents
  let skipList = targetQuest.linearMapAll((quest) => {
    return quest;
  });

  // Returns all quests that are not in skip list, from App.state object
  const fullList = questList.map((quest, index) => {
    return quest.linearMapAll((q, depth) => {      
      let key = depth.join('-');
        if(!skipList.includes(q)) {
          return <option value={q.id} data-depth={key} key={key}>{q.title}</option>
        }
    }, [index]);
  });
  return fullList;
}
