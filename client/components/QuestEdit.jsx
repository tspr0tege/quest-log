import React, { useContext, useState } from 'react';

import QuestList from './QuestList.jsx';
import { Context } from './App.jsx';

export default ({ quest }) => {
  const { editQuest, questList } = useContext(Context);
  let [title, setTitle] = useState(quest.title);
  let [description, setDescription] = useState(quest.description);
  let [parentQuest, setParent] = useState(quest.parentQuest);
  let [contribution, setContribution] = useState(quest.contribution);
  // event.persist(), state = {title, description, parent}

  const submit = (e) => {
    e.preventDefault();
    // let { title, description, parentQuest } = e.target.form;
    editQuest(quest, { title, description, parentQuest, contribution });
  }

  const updateParent = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'None') {
      setParent(null);
    } else {
      let depth = e.target.options[e.target.selectedIndex].dataset.depth.split('-');
      let newParent = questList[depth[0]];
      for (let i = 1; i < depth.length; i++) {
        newParent = newParent.subQuests[depth[i]];
      }
      setParent(newParent);
    }
  }

  return (
    <form id='quest-edit-form'>
      <div>
        <h3>Title:</h3>
        <input type='text' value={title} onChange={e => {setTitle(e.target.value)}}></input>
      </div>
      <div>
        <h3>Description:</h3>
        <textarea value={description} onChange={e => {setDescription(e.target.value)}} placeholder='Enter a description...' rows='5' style={{width: '95%'}}></textarea>
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
        defaultValue={(parentQuest) ? parentQuest.id : null}>
          <option value={null}>None</option>
          {dropList(quest)}
        </select>
      </div>
      {parentQuest && <div>
        <h3>Contribution to Quest Line:</h3>
        <div style={{display: 'flex'}}>
          <input type='range' min='0' max='100' step='1' value={contribution} onChange={e => {setContribution(parseInt(e.target.value))}}/>
          <input type='number' min='0' max='100' value={contribution} onChange={e => {setContribution(parseInt(e.target.value))}}/>
        </div>
      </div>}
      <button onClick={submit} style={{marginTop: '20px'}}>Submit Changes</button>
    </form>
  );
}

const dropList = (targetQuest) => {
  const { questList } = useContext(Context);

  let skipList = targetQuest.linearMapAll((quest) => {
    return quest;
  });

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
