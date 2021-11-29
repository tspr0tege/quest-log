import React, { useContext, useState } from 'react';

import QuestList from './QuestList.jsx';
import { Context } from './App.jsx';

export default ({ quest }) => {
  const { editQuest, questList } = useContext(Context);
  let [title, setTitle] = useState(quest.title);
  let [description, setDescription] = useState(quest.description);
  let [parent, setParent] = useState(quest.parent);

  const submit = (e) => {
    e.preventDefault();
    // let { title, description, parentQuest } = e.target.form;
    editQuest(quest, { title, description, parent });
  }

  const updateParent = (e) => {
    if (e.target.value === null) {
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
    <form>
      <h3>Title:</h3>
      <input type='text' name='title' value={title} onChange={e => {setTitle(e.target.value)}}></input>
      <h3>Description:</h3>
      <textarea name='description' value={description} onChange={e => {setDescription(e.target.value)}}></textarea>
      <h3>Progress:</h3>
      <p>{quest.progress}%</p>
      <h3>Sub-quests:</h3>
      <QuestList  quests={quest.subQuests} />
      <h3>Parent Quest Line:</h3>
      <select
      name="parentQuest" 
      id="parent-quest-dropdown" 
      onChange={updateParent}
      defaultValue={(parent) ? parent.id : null}>
        <option value={null}>None</option>
        {dropList(quest)}
      </select>
      <h3>Contribution to Quest Line:</h3>
      <p>{quest.contribution}%</p>
      <button onClick={submit}>Submit Changes</button>
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
