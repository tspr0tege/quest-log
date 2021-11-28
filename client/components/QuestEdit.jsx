import React, { useContext, useState } from 'react';

import QuestList from './QuestList.jsx';
import { Context } from './App.jsx';


export default ({ quest }) => {
  
  let { 
    title, 
    description, 
    progress, 
    subQuests, 
    parentQuest, 
    parentContribution } = quest;

  const [editDes, toggleEditDes] = useState(false);
  const [editTitle, toggleEditTitle] = useState(false);

  return (
    <>    
      <QuestTitle quest={quest} title={title} edit ={editTitle} toggle={toggleEditTitle}/>
      <DescriptionElement quest={quest} description={description} edit={editDes} toggle={toggleEditDes}/>
      <p>Progress: {progress}%</p>
      <h3>Sub-quests:</h3>
      <QuestList  quests={subQuests} />
      <p>Sub-quest of: {dropList(parentQuest, quest)}</p>
      <p>Completing this quest will contribute {parentContribution} to its parent quest.</p>      
    </>
  );
}

const QuestTitle = ({ quest, title, edit, toggle }) => {
  const { editQuest } = useContext(Context);
  const [titleValue, changeTitle] = useState(title);

  function handleClick(e) {    
    if (edit) {
      e.preventDefault();      
      editQuest(quest, {title: titleValue});
    }
    toggle(!edit);
  }

  function handleChange(e) {
    changeTitle(e.target.value);
  }

  if (edit) {
    return (      
      <form>
        <input type='text' value={titleValue} onChange={handleChange}></input>
        <button onClick={handleClick}>Apply</button>
      </form>
    )
  } else {
    return ( <h3 onClick={handleClick}>Title: {titleValue}</h3> );
  }
}

const DescriptionElement = ({ quest, description, edit, toggle }) => {  
  const { editQuest } = useContext(Context);
  const [desValue, changeDes] = useState(description);

  function handleClick(e) {    
    if (edit) {
      e.preventDefault();      
      editQuest(quest, {description: desValue});
    }
    toggle(!edit);
  }

  function handleChange(e) {
    changeDes(e.target.value);
  }

  if (edit) {
    return (
      <form>
        <textarea value={desValue} onChange={handleChange}></textarea>
        <button onClick={handleClick}>Apply</button>
      </form>
    )
  } else {
    return(
      <>
        <h3>Description:</h3>
        <p onClick={handleClick}>{description}</p>
      </>
    )
  }
}

const dropList = (parent, chosenQuest) => {
  const { questList, editQuest } = useContext(Context);

  let skipList = chosenQuest.linearMapAll((quest) => {
    return quest;
  });

  const fullList = questList.map((quest, index) => {
    return quest.linearMapAll((q, depth) => {
      let { title } = q;
      let key = depth.join('-');
        if(!skipList.includes(q)) {
          return <option value={key} key={key}>{title}</option>
        }
    }, [index]);
  });

  function updateParent (e) {
    let depth = e.target.value.split('-');
    let parent = questList[depth[0]];
    for (let i = 1; i < depth.length; i++) {
      parent = parent.subQuests[depth[i]];
    }
    editQuest(chosenQuest, { parent });
  }

  return (
    <select 
    name="parent-quest" 
    id="parent-quest-dropdown" 
    onChange={updateParent}
    defaultValue={(parent) ? questList.indexOf(parent) : parent}>
      <option value={null}>None</option>
      {fullList}
    </select>
  );
}
